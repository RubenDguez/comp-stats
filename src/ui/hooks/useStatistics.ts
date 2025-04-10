import { useEffect, useState } from "react";

export default function useStatistics(dataPoints: number): Array<Statistics> {
    const [value, setValue] = useState<Array<Statistics>>([]);

  useEffect(() => {
    const unsubscribe = window.electron.subscribeStaticstics((stats) =>
        setValue((prev) => {
            const data = [...prev, stats];

            if (data.length > dataPoints) {
                data.shift();
            }

            return data;
        })
    );
    return unsubscribe;
  }, [dataPoints]);

    return value;
}
