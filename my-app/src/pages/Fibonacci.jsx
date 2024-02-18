import { useState } from "react";

export default function Fibonacci() {

    const [rows, setRow] = useState(1);
    const [columns, setCol] = useState(1);
    const [arr, setArr] = useState([]);

    function handleGenerateFibonacci(event) {
        const fibonacci = [];
        for (let i = 0; i < rows; i++) {
            const row = [];
            for (let j = 0; j < columns; j++) {
                row.push(calculateFibonacci(i * columns + j));
            }
            fibonacci.push(row);
        }
        setArr([...fibonacci]);
        event.preventDefault();
    }

    function calculateFibonacci(n) {
        if (n <= 0) return 0;
        if (n === 1) return 1;
        return calculateFibonacci(n - 1) + calculateFibonacci(n - 2);
    }

    return (
        <>
            <div className="flex flex-col items-center justify-center h-full">
                <h1 className="text-3xl font-bold mb-8 absolute top-20">Fibonacci</h1>
                <div className="absolute top-32 flex flex-row gap-2">
                    <div className="mb-8">
                        <input type="number" placeholder="Rows" className="input input-bordered max-w-xs" onChange={(event) => setRow(event.target.value)} />
                    </div>
                    <div className="mb-8">
                        <input type="number" placeholder="Columns" className="input input-bordered max-w-xs" onChange={(event) => setCol(event.target.value)} />
                    </div>
                    <div className="mb-8">
                        <button className="rounded-lg bg-primary py-4 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white hover:shadow-lg hover:shadow-blue-500/40" type="submit" onClick={handleGenerateFibonacci}>
                            Generate
                        </button>
                    </div>
                </div>
                <div className="rounded-lg p-4">
                    <table className="table-auto mx-auto">
                        <tbody>
                            {arr.map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                    {row.map((number, columnIndex) => (
                                        <td key={columnIndex} className="border px-4 py-2">{number}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}