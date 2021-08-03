export class Account{
    public userID!: string;
    public firstName!: string;
    public lastName!: string;
    public userName!: string;
    public email!: string;
    public phoneNumber!: string;
    public promotionalPoins!: number;        
    public role!: string;  

    public static recoverAccount(input: string): Account{
        let tempData = input.trim().split(";");
    
        let result: Account = new Account();
        result.userID = tempData[0];
        result.firstName = tempData[1];
        result.lastName = tempData[2];
        result.userName = tempData[3];
        result.email = tempData[4];
        result.phoneNumber = tempData[5];
        result.promotionalPoins = Number(tempData[6]);
        result.role = tempData[7];
    
        return result;
    }

    public static convertAccountToString(a: Account): string{
        return a.userID + ";" + a.firstName + ";" + a.lastName + ";" + a.userName + ";" +
          a.email + ";" + a.phoneNumber + ";" + a.promotionalPoins + ";" + a.role;
    }
}