export default function parseId(value: string): number | undefined {
    const id = Number(value)

    if (!Number.isInteger(id) || id < 1) return undefined;

    return id;
}