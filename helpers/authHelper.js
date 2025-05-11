import bcrypt from 'bcryptjs';

export const hashPassword = async(password) => {
    if (!password) {
        throw new Error('Password is required');
    }
    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(String(password), saltRounds);
        return hashedPassword;
    } catch (error) {
        console.error('Error hashing password:', error);
        throw error;
    }
}

export const comparePassword = async(password, hashedPassword) => {
    if (!password || !hashedPassword) {
        throw new Error('Both password and hashedPassword are required');
    }
    try {
        return await bcrypt.compare(String(password), hashedPassword);
    } catch (error) {
        console.error('Error comparing passwords:', error);
        throw error;
    }
}