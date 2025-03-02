
const formatClickCount = (count: number) => {
    if (count >= 1000) {
        return (count / 1000).toFixed(1) + "K";
    }
    return count.toString();
};
export default formatClickCount