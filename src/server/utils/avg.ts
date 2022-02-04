export async function marksAvg(marks) {
    let avg = 0;
    for (let i = 0; i < marks.length; i++) {
        avg += marks[i]['grade'];
    }
    avg /= marks.length;
    return avg;
}
