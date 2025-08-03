export const randomString = (length: number): string=>{
    const values: string = "qabdefwy947r9842ohkiewbafwuo9rqor0283892qphwfuhyq20893805879htjqebrkl1oy";
    const valueLength: number = values.length;

    let result: string = "";

    for(let i=0; i<length; i++){
        result += values[Math.floor(Math.random()*valueLength)];
    }

    return result;
}