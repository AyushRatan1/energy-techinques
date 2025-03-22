-- This file contains the SQL commands to set up your Supabase database
-- You can run these commands in the Supabase SQL Editor when you have your account

-- Create instructors table
CREATE TABLE instructors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT NOT NULL,
  bio TEXT NOT NULL,
  image_url TEXT NOT NULL
);

-- Create courses table
CREATE TABLE courses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  duration TEXT NOT NULL,
  instructor_id UUID NOT NULL REFERENCES instructors(id),
  image_url TEXT NOT NULL,
  registration_link TEXT NOT NULL
);

-- Create testimonials table
CREATE TABLE testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT NOT NULL,
  position TEXT NOT NULL,
  company TEXT NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT
);

-- Create RLS policies for instructors
ALTER TABLE instructors ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read instructors
CREATE POLICY "Allow public read access to instructors" 
  ON instructors FOR SELECT 
  USING (true);

-- Allow authenticated users to insert, update, delete instructors
CREATE POLICY "Allow authenticated users to manage instructors" 
  ON instructors FOR ALL 
  USING (auth.role() = 'authenticated');

-- Create RLS policies for courses
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read courses
CREATE POLICY "Allow public read access to courses" 
  ON courses FOR SELECT 
  USING (true);

-- Allow authenticated users to insert, update, delete courses
CREATE POLICY "Allow authenticated users to manage courses" 
  ON courses FOR ALL 
  USING (auth.role() = 'authenticated');

-- Create RLS policies for testimonials
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read testimonials
CREATE POLICY "Allow public read access to testimonials" 
  ON testimonials FOR SELECT 
  USING (true);

-- Allow authenticated users to insert, update, delete testimonials
CREATE POLICY "Allow authenticated users to manage testimonials" 
  ON testimonials FOR ALL 
  USING (auth.role() = 'authenticated');

-- Insert sample instructors
INSERT INTO instructors (name, bio, image_url) VALUES
  ('Dr. Sarah Reynolds', 'Dr. Reynolds is a leading expert in energy systems with over 15 years of experience in turbine optimization and power plant efficiency.', '/placeholder.svg?height=400&width=400'),
  ('Prof. James Chen', 'Professor Chen specializes in renewable energy integration and has consulted for major energy corporations worldwide on sustainable practices.', '/placeholder.svg?height=400&width=400'),
  ('Eng. Maria Rodriguez', 'Engineer Rodriguez brings practical field experience from her 20+ years working with industrial steam systems and energy recovery technologies.', '/placeholder.svg?height=400&width=400'),
  ('PK Sinha', 'PK Sinha is a renowned energy expert with over 25 years of experience in power generation, transmission, and distribution systems. He has led major energy infrastructure projects across Asia and Europe.', '/placeholder.svg?height=400&width=400');

-- Insert sample courses
INSERT INTO courses (title, description, duration, instructor_id, image_url, registration_link) VALUES
  ('PowerUp Masterclass Series - Steam Turbine Distress Signals', 'Learn to identify and troubleshoot critical steam turbine distress signals. This comprehensive course covers early detection methods, analysis techniques, and preventative maintenance strategies to optimize turbine performance and prevent costly failures.', '6 Weeks', (SELECT id FROM instructors WHERE name = 'Dr. Sarah Reynolds'), '/placeholder.svg?height=600&width=800', 'https://lnkd.in/dhseGAEP'),
  ('Advanced Energy Efficiency Optimization', 'Master the latest techniques in energy efficiency optimization for industrial systems. This course provides hands-on training in energy auditing, system analysis, and implementation of efficiency measures that deliver significant cost savings.', '8 Weeks', (SELECT id FROM instructors WHERE name = 'Prof. James Chen'), '/placeholder.svg?height=600&width=800', 'https://example.com/register'),
  ('Renewable Integration for Power Engineers', 'Develop expertise in integrating renewable energy sources into existing power systems. Learn about grid stability, energy storage solutions, and smart grid technologies that enable seamless renewable integration.', '10 Weeks', (SELECT id FROM instructors WHERE name = 'Eng. Maria Rodriguez'), '/placeholder.svg?height=600&width=800', 'https://example.com/register'),
  ('Industrial Energy Management Systems', 'Comprehensive training on implementing and managing energy management systems in industrial settings. Learn ISO 50001 standards, energy performance indicators, and continuous improvement methodologies.', '6 Weeks', (SELECT id FROM instructors WHERE name = 'Prof. James Chen'), '/placeholder.svg?height=600&width=800', 'https://example.com/register'),
  ('Power Plant Reliability Engineering', 'Enhance your skills in reliability-centered maintenance for power generation facilities. This course covers failure mode analysis, condition monitoring, and predictive maintenance strategies to maximize uptime and asset life.', '8 Weeks', (SELECT id FROM instructors WHERE name = 'Dr. Sarah Reynolds'), '/placeholder.svg?height=600&width=800', 'https://example.com/register'),
  ('Energy Storage Technologies', 'Explore the rapidly evolving field of energy storage technologies. From batteries to thermal storage, learn about selection criteria, sizing methodologies, and economic analysis for various applications.', '7 Weeks', (SELECT id FROM instructors WHERE name = 'Eng. Maria Rodriguez'), '/placeholder.svg?height=600&width=800', 'https://example.com/register'),
  ('Power System Protection and Control', 'Master the fundamentals and advanced concepts of power system protection and control. This course covers relay coordination, fault analysis, and modern digital protection systems for reliable power delivery.', '9 Weeks', (SELECT id FROM instructors WHERE name = 'PK Sinha'), '/placeholder.svg?height=600&width=800', 'https://example.com/register'),
  ('Smart Grid Technologies and Implementation', 'Learn about cutting-edge smart grid technologies and their practical implementation. This course covers advanced metering infrastructure, distribution automation, and grid modernization strategies.', '8 Weeks', (SELECT id FROM instructors WHERE name = 'PK Sinha'), '/placeholder.svg?height=600&width=800', 'https://example.com/register');

-- Insert sample testimonials
INSERT INTO testimonials (name, position, company, content, image_url) VALUES
  ('John Smith', 'Chief Engineer', 'PowerGen Solutions', 'The Energy Techniques courses have significantly improved my understanding of energy systems. The instructors are knowledgeable and the content is directly applicable to my work.', '/placeholder.svg?height=100&width=100'),
  ('Emily Johnson', 'Operations Manager', 'Global Energy Corp', 'I highly recommend the PowerUp Masterclass Series. It provided our team with practical skills that we implemented immediately, resulting in a 15% efficiency improvement.', '/placeholder.svg?height=100&width=100'),
  ('Michael Wong', 'Technical Director', 'Renewable Systems Inc', 'The course on Renewable Integration was exactly what our team needed. The instructors bring real-world experience that makes the content relevant and actionable.', '/placeholder.svg?height=100&width=100');

