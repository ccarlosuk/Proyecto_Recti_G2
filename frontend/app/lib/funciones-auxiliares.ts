// Obtener la fecha actual en formato 'YYYY-MM-DD' (por ejemplo, '2023-11-19')
export default function fechaActualString() {
    return new Date().toISOString().split('T')[0];
}

/*
export function getCurrentDate(separator=''){

    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date}`
}*/
