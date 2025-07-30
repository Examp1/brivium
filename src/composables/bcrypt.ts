import bcrypt from "bcrypt";

export async function hashStr(password: string) {
    const saltRound: number = 10;
    return await bcrypt.hash(password, saltRound);
}
export async function compareStr(textPwd: string, hashStr: string) {
    return await bcrypt.compare(textPwd, hashStr);
}
