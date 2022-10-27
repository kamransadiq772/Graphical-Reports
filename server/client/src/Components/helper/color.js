const color = (index, number, length = 360) => {
    return `hsl(${index*length/number},65%,65%)`
}
export default color