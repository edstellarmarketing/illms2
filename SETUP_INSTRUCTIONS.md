# Invensis Learning LMS - Setup Instructions

## Database Setup

Please run the following SQL commands in your Supabase SQL Editor to set up the required tables:

### 1. Create Students Table

```sql
CREATE TABLE IF NOT EXISTS students (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE students ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations (for demo purposes)
CREATE POLICY "Allow all operations on students" ON students
  FOR ALL
  USING (true)
  WITH CHECK (true);
```

### 2. Create Resources Table

```sql
CREATE TABLE IF NOT EXISTS resources (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  file_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations (for demo purposes)
CREATE POLICY "Allow all operations on resources" ON resources
  FOR ALL
  USING (true)
  WITH CHECK (true);
```

### 3. Insert Sample Resources (3 Sample PDFs)

```sql
INSERT INTO resources (title, description, file_url) VALUES
  (
    'Introduction to Project Management',
    'Learn the fundamentals of project management including planning, execution, and monitoring.',
    'https://www.africau.edu/images/default/sample.pdf'
  ),
  (
    'Agile Methodology Guide',
    'Comprehensive guide to Agile practices, Scrum framework, and sprint planning.',
    'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
  ),
  (
    'Leadership and Team Building',
    'Essential leadership skills and techniques for building high-performing teams.',
    'https://www.adobe.com/support/products/enterprise/knowledgecenter/media/c4611_sample_explain.pdf'
  );
```

## Admin Credentials

- **Email:** vijay@edstellar.com
- **Password:** admin123

## How to Use

### For Students:
1. Choose "Student Portal" from the home screen
2. Sign up with your name and email
3. Login to access learning resources
4. View and download PDF materials
5. Logout when done

### For Admin:
1. Choose "Admin Console" from the home screen
2. Login with admin credentials (vijay@edstellar.com / admin123)
3. Add, edit, or delete learning resources
4. Resources are immediately available to all students
5. Logout when done

## Features

### Student Portal
- ✅ User registration and login
- ✅ View all available learning resources
- ✅ Download/View PDFs
- ✅ Secure logout

### Admin Console
- ✅ Admin authentication (vijay@edstellar.com)
- ✅ Create new resources with title, description, and PDF URL
- ✅ Edit existing resources
- ✅ Delete resources
- ✅ Real-time updates via Supabase

## Notes

- The student and admin portals are separate but connected through the same Supabase database
- Students are stored in the `students` table
- Resources are stored in the `resources` table
- All students can access all resources (no per-student permissions in this version)
