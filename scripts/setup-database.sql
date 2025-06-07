-- Create tables for quiz system and user progress
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE,
    country VARCHAR(100),
    preferred_language VARCHAR(10),
    formality_preference VARCHAR(20) DEFAULT 'informal',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS quiz_sessions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    course_id INTEGER,
    score INTEGER DEFAULT 0,
    total_questions INTEGER DEFAULT 0,
    completed_at TIMESTAMP,
    language_code VARCHAR(10),
    formality_tone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS quiz_questions (
    id SERIAL PRIMARY KEY,
    course_id INTEGER,
    question_text TEXT NOT NULL,
    question_type VARCHAR(50) DEFAULT 'multiple_choice',
    correct_answer TEXT,
    options JSONB,
    cultural_context VARCHAR(255),
    difficulty_level VARCHAR(20) DEFAULT 'beginner',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS user_achievements (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    achievement_type VARCHAR(100),
    achievement_data JSONB,
    earned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample quiz questions
INSERT INTO quiz_questions (course_id, question_text, correct_answer, options, cultural_context, difficulty_level) VALUES
(1, 'What is the main process that moves water from oceans to the atmosphere?', 'Evaporation', '["Evaporation", "Condensation", "Precipitation", "Collection"]', 'rice terraces', 'beginner'),
(1, 'Which traditional farming method in Southeast Asia demonstrates the water cycle?', 'Rice terraces', '["Rice terraces", "Corn fields", "Coconut groves", "Rubber plantations"]', 'banaue rice terraces', 'intermediate'),
(2, 'What ancient kingdom was known for its advanced water management systems?', 'Angkor', '["Angkor", "Majapahit", "Srivijaya", "Ayutthaya"]', 'angkor wat', 'intermediate');
