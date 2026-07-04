import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import type { Wycena } from '@/types';
import type { CompanyInfo } from '@/context/CompanyContext';

function fmt(n: number): string {
  return n.toLocaleString('pl-PL', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export async function printWycena(wycena: Wycena, company: CompanyInfo): Promise<void> {
  const rows = wycena.positions.map((p, i) => `
    <tr>
      <td class="center">${i + 1}</td>
      <td>${p.workTypeName}</td>
      <td class="center">${p.workTypeUnit}</td>
      <td class="right">${fmt(p.area)}</td>
      <td class="right">${fmt(p.pricePerUnit)}</td>
      <td class="right bold">${fmt(p.totalPrice)}</td>
    </tr>
  `).join('');

  const vatRow = wycena.vatRate > 0 ? `
    <tr class="summary-row">
      <td colspan="5" class="right">VAT ${wycena.vatRate}%</td>
      <td class="right">${fmt(wycena.totalVat)} ${wycena.currencySymbol}</td>
    </tr>
    <tr class="total-row">
      <td colspan="5" class="right">RAZEM BRUTTO</td>
      <td class="right">${fmt(wycena.totalGross)} ${wycena.currencySymbol}</td>
    </tr>
  ` : '';

  const date = new Date(wycena.createdAt).toLocaleDateString('pl-PL', {
    day: '2-digit', month: '2-digit', year: 'numeric',
  });

  const logoHtml = company.logoUri
    ? `<img src="${company.logoUri}" alt="logo" style="max-height:60px;max-width:140px;object-fit:contain;" />`
    : '';

  const companyBlock = [
    company.name && `<div class="company-name">${company.name}</div>`,
    company.address && `<div>${company.address}</div>`,
    company.phone && `<div>${company.phone}</div>`,
    company.email && `<div>${company.email}</div>`,
  ].filter(Boolean).join('');

  const clientBlock = (wycena.clientName || wycena.clientAddress) ? `
    <div class="client-box">
      <div class="section-label">DLA:</div>
      ${wycena.clientName ? `<div class="client-name">${wycena.clientName}</div>` : ''}
      ${wycena.clientAddress ? `<div>${wycena.clientAddress}</div>` : ''}
    </div>
  ` : '';

  const html = `<!DOCTYPE html>
<html lang="pl">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Kosztorys nr ${wycena.number}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 13px; color: #1a1a1a; background: #fff; padding: 32px; }
    .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 32px; }
    .logo-company { display: flex; flex-direction: column; gap: 8px; }
    .company-name { font-size: 16px; font-weight: 700; }
    .company-details { color: #555; font-size: 12px; line-height: 1.6; }
    .doc-info { text-align: right; }
    .doc-title { font-size: 22px; font-weight: 700; color: #EA580C; }
    .doc-meta { color: #666; font-size: 12px; margin-top: 4px; line-height: 1.6; }
    .client-box { background: #f9f6f3; border-left: 3px solid #EA580C; padding: 12px 16px; margin-bottom: 24px; border-radius: 0 6px 6px 0; }
    .section-label { font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.8px; color: #EA580C; margin-bottom: 4px; }
    .client-name { font-weight: 600; font-size: 14px; }
    table { width: 100%; border-collapse: collapse; margin-bottom: 0; }
    thead tr { background: #EA580C; color: #fff; }
    thead th { padding: 10px 8px; text-align: left; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }
    thead th.center { text-align: center; }
    thead th.right { text-align: right; }
    tbody tr { border-bottom: 1px solid #f0ebe6; }
    tbody tr:nth-child(even) { background: #fdf9f7; }
    td { padding: 10px 8px; vertical-align: middle; }
    td.center { text-align: center; color: #666; }
    td.right { text-align: right; }
    td.bold { font-weight: 600; }
    .summary-row td { padding: 8px; border-top: 1px solid #e8e0d8; color: #555; }
    .summary-row td.right { text-align: right; }
    .net-row td { padding: 10px 8px; border-top: 2px solid #e8e0d8; font-weight: 600; }
    .net-row td.right { text-align: right; }
    .total-row td { padding: 12px 8px; background: #EA580C; color: #fff; font-weight: 700; font-size: 15px; }
    .total-row td.right { text-align: right; }
    .footer { margin-top: 40px; padding-top: 16px; border-top: 1px solid #e8e0d8; color: #999; font-size: 11px; text-align: center; }
    .currency-col { width: 40px; }
  </style>
</head>
<body>
  <div class="header">
    <div class="logo-company">
      ${logoHtml}
      <div class="company-details">${companyBlock}</div>
    </div>
    <div class="doc-info">
      <div class="doc-title">KOSZTORYS NR ${wycena.number}</div>
      <div class="doc-meta">
        Data: ${date}<br/>
        Waluta: ${wycena.currencyCode} (${wycena.currencySymbol})
      </div>
    </div>
  </div>

  ${clientBlock}

  <table>
    <thead>
      <tr>
        <th class="center" style="width:36px">Lp.</th>
        <th>Nazwa roboty</th>
        <th class="center" style="width:48px">Jedn.</th>
        <th class="right" style="width:64px">Ilość</th>
        <th class="right" style="width:90px">Cena jedn.</th>
        <th class="right" style="width:100px">Wartość (${wycena.currencySymbol})</th>
      </tr>
    </thead>
    <tbody>
      ${rows}
      <tr class="net-row">
        <td colspan="5" class="right">RAZEM NETTO</td>
        <td class="right">${fmt(wycena.totalNet)} ${wycena.currencySymbol}</td>
      </tr>
      ${vatRow}
    </tbody>
  </table>

  <div class="footer">
    Dokument wygenerowany przez BuildCalc
  </div>
</body>
</html>`;

  try {
    const { uri } = await Print.printToFileAsync({ html, base64: false });
    await Sharing.shareAsync(uri, { mimeType: 'application/pdf', dialogTitle: `Kosztorys nr ${wycena.number}` });
  } catch (e) {
    console.warn('Print error:', e);
  }
}
