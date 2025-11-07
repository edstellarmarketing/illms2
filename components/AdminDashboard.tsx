import { useState, useEffect } from 'react';
import { supabase, Resource } from '../lib/supabase';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { FileText, LogOut, Plus, Pencil, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

type AdminDashboardProps = {
  onLogout: () => void;
};

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [resources, setResources] = useState<Resource[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingResource, setEditingResource] = useState<Resource | null>(null);
  
  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [fileUrl, setFileUrl] = useState('');

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      const { data, error } = await supabase
        .from('resources')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        toast.error('Failed to load resources');
        setIsLoading(false);
        return;
      }

      setResources(data || []);
    } catch (error) {
      toast.error('An error occurred while loading resources');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenDialog = (resource?: Resource) => {
    if (resource) {
      setEditingResource(resource);
      setTitle(resource.title);
      setDescription(resource.description);
      setFileUrl(resource.file_url);
    } else {
      setEditingResource(null);
      setTitle('');
      setDescription('');
      setFileUrl('');
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingResource(null);
    setTitle('');
    setDescription('');
    setFileUrl('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingResource) {
        // Update existing resource
        const { error } = await supabase
          .from('resources')
          .update({
            title,
            description,
            file_url: fileUrl,
            updated_at: new Date().toISOString(),
          })
          .eq('id', editingResource.id);

        if (error) {
          toast.error('Failed to update resource');
          return;
        }

        toast.success('Resource updated successfully!');
      } else {
        // Create new resource
        const { error } = await supabase
          .from('resources')
          .insert([
            {
              title,
              description,
              file_url: fileUrl,
            }
          ]);

        if (error) {
          toast.error('Failed to create resource');
          return;
        }

        toast.success('Resource created successfully!');
      }

      handleCloseDialog();
      fetchResources();
    } catch (error) {
      toast.error('An error occurred');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this resource?')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('resources')
        .delete()
        .eq('id', id);

      if (error) {
        toast.error('Failed to delete resource');
        return;
      }

      toast.success('Resource deleted successfully!');
      fetchResources();
    } catch (error) {
      toast.error('An error occurred while deleting');
    }
  };

  const handleLogout = () => {
    toast.success('Admin logged out successfully');
    onLogout();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1>Invensis Learning - Admin Console</h1>
            <p className="text-muted-foreground">Manage learning resources</p>
          </div>
          <Button onClick={handleLogout} variant="outline">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h2>Resources Management</h2>
            <p className="text-muted-foreground">Create, edit, and manage learning resources</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => handleOpenDialog()}>
                <Plus className="mr-2 h-4 w-4" />
                Add Resource
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingResource ? 'Edit Resource' : 'Add New Resource'}</DialogTitle>
                <DialogDescription>
                  {editingResource ? 'Update the resource details below' : 'Fill in the details to create a new resource'}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Introduction to Python"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Brief description of the resource"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="file-url">PDF URL</Label>
                  <Input
                    id="file-url"
                    type="url"
                    placeholder="https://example.com/document.pdf"
                    value={fileUrl}
                    onChange={(e) => setFileUrl(e.target.value)}
                    required
                  />
                </div>
                <div className="flex gap-2 justify-end">
                  <Button type="button" variant="outline" onClick={handleCloseDialog}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    {editingResource ? 'Update' : 'Create'} Resource
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading resources...</p>
          </div>
        ) : resources.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No resources yet. Click "Add Resource" to create one.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((resource) => (
              <Card key={resource.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <FileText className="h-8 w-8 text-purple-600" />
                  </div>
                  <CardTitle>{resource.title}</CardTitle>
                  <CardDescription>{resource.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Button 
                      className="flex-1" 
                      variant="outline"
                      onClick={() => handleOpenDialog(resource)}
                    >
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit
                    </Button>
                    <Button 
                      variant="destructive"
                      onClick={() => handleDelete(resource.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2 truncate">
                    URL: {resource.file_url}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}