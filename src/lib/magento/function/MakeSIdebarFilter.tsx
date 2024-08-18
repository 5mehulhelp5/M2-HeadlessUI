export function transformDataIntoFilter(data: Record<string, string[]>): Record<string, any> | null{
    const result: Record<string, any> = {};

    Object.entries(data).forEach(([key, value]) => {
        if (key === "price" && value.length > 0) {
            let minPrice = Number.POSITIVE_INFINITY;
            let maxPrice = Number.NEGATIVE_INFINITY;

            value.forEach(range => {
                const [from, to] = range.split('_').map(Number);
                if (!isNaN(from) && !isNaN(to)) {
                    if (from < minPrice) minPrice = from;
                    if (to > maxPrice) maxPrice = to;
                }
            });

            if (minPrice !== Number.POSITIVE_INFINITY && maxPrice !== Number.NEGATIVE_INFINITY) {
                result[key] = {
                    from: minPrice.toString(),
                    to: maxPrice.toString()
                };
            }

        } else if (value.length > 0) {
            const numericValues = value.map(val => parseInt(val, 10)).filter(val => !isNaN(val));
            if (numericValues.length > 1) {
                result[key] = {
                    in: numericValues.map(val => val.toString())
                };
            } else if (numericValues.length === 1) {
                result[key] = {
                    eq: numericValues[0].toString()
                };
            }
        }
    });
    if(Object.entries(result).length  === 0){
        return null;
    }
    return result;
}
