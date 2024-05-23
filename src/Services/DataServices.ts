export const GetAdviceAPI = async () => {
    const promise = await fetch('https://api.adviceslip.com/advice');
    const data: IAdviceData = await promise.json();
    return data.slip;
}