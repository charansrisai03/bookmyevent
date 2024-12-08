import bcrypt from 'bcryptjs';

export const hashPassword = async(password) => {
    try{
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password,saltRounds);
        return hashedPassword;
    }catch(error)
    {
    }
};

export const comaprePassword = async (password,hashedPassword) => {
    return bcrypt.compare(password,hashedPassword);
}