export default function Shuffle(queue) {
    const newQueue = [...queue]
    newQueue.sort(() => Math.random() - 0.5)
    return newQueue

};