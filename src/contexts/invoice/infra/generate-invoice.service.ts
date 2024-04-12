export default function generateInvoice(itemName: string, amount: number) {
    const item = itemName.slice(0, 5).padEnd(26);
    const total = formatCurrency(amount).padEnd(27);
    const createdAt = new Date().toLocaleString().padEnd(26);

    return `
  ---------------------------------
|              INVOICE              |
  ---------------------------------
| Item: ${item}  |
| Qtd: ${total}  |
| Date: ${createdAt}  |
  ---------------------------------
|             THANK YOU!            |
  ---------------------------------
`;

}

function formatCurrency(amount: number) {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(amount);
}