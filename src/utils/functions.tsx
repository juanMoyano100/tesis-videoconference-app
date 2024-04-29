export function convertDateStringToDate(dateString: Date) {
    const year = dateString.getFullYear();
    const month = dateString.getMonth() + 1; // Los meses en JS empiezan en 0, por lo que hay que sumar 1
    const day = dateString.getDate();
    const hours = dateString.getHours();
    const minutes = dateString.getMinutes();
    const seconds = dateString.getSeconds();
    return `${year}-${month}-${day}T${hours}:${minutes}`;
}


export const getUserByEmail = async (email: string) => {
    fetch(`/api/getUserByEmail?email=${email}`)
        .then((response) => response.json())
        .then((data) => {
            return data;
        });
}
