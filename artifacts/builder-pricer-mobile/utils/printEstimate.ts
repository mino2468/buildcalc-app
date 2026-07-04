import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import type { Estimate } from '@/types';
import type { CompanyInfo } from '@/context/CompanyContext';

function fmtNumber(n: number): string {
  if (n >= 1000) return n.toLocaleString('de-DE', { maximumFractionDigits: 0 });
  return n.toFixed(2);
}

function fmtDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString('pl-PL', {
      day: '2-digit', month: '2-digit', year: 'numeric',
    });
  } catch { return iso; }
}

export async function printEstimate(estimate: Estimate, company: CompanyInfo): Promise<void> {
  const logoHtml = company.logoUri
    ? `<img src="${company.logoUri}" alt="Logo" style="height:72px;max-width:200px;object-fit:contain;" />`
    : `<div style="width:64px;height:64px;background:#EA580C;border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:32px;font-weight:700;color:#fff;">B</div>`;

  const companyBlock = company.name
    ? `<div class="company-name">${company.name}</div>
       ${company.address ? `<div class="company-detail">${company.address}</div>` : ''}
       ${company.phone ? `<div class="company-detail">📞 ${company.phone}</div>` : ''}
       ${company.email ? `<div class="company-detail">✉ ${company.email}</div>` : ''}`
    : `<div class="company-name">BuildCalc</div><div class="company-detail">Profesjonalna wycena robót</div>`;

  const html = `
<!DOCTYPE html>
<html lang="pl">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #FAF8F5;
      color: #1C1917;
      padding: 40px;
      max-width: 640px;
      margin: auto;
    }
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-bottom: 24px;
      border-bottom: 2px solid #EA580C;
      margin-bottom: 32px;
    }
    .header-left { display: flex; align-items: center; gap: 16px; }
    .company-name { font-size: 20px; font-weight: 700; color: #1C1917; }
    .company-detail { font-size: 13px; color: #78716C; margin-top: 3px; }
    .doc-title { font-size: 13px; color: #78716C; text-align: right; }
    .doc-id { font-size: 22px; font-weight: 700; color: #EA580C; text-align: right; }
    .doc-date { font-size: 12px; color: #78716C; text-align: right; margin-top: 2px; }

    .section-title {
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #78716C;
      margin-bottom: 12px;
      margin-top: 28px;
    }
    .work-card {
      background: #fff;
      border-radius: 14px;
      border: 1px solid #E7E5E4;
      padding: 20px;
    }
    .work-name { font-size: 18px; font-weight: 700; color: #1C1917; margin-bottom: 4px; }
    .work-label { font-size: 13px; color: #78716C; }

    .price-grid {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 12px;
      margin-top: 20px;
    }
    .price-cell {
      background: #FAF8F5;
      border-radius: 10px;
      padding: 12px;
      text-align: center;
    }
    .price-cell-label { font-size: 10px; font-weight: 600; text-transform: uppercase; color: #A8A29E; letter-spacing: 0.5px; }
    .price-cell-value { font-size: 16px; font-weight: 700; color: #1C1917; margin-top: 4px; }

    .calc-grid {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 12px;
      margin-top: 12px;
    }
    .calc-cell { text-align: center; }
    .calc-cell-label { font-size: 11px; color: #78716C; }
    .calc-cell-value { font-size: 20px; font-weight: 700; color: #1C1917; margin-top: 4px; }
    .calc-cell-unit { font-size: 12px; color: #A8A29E; }

    .total-card {
      background: #EA580C;
      border-radius: 14px;
      padding: 24px;
      text-align: center;
      margin-top: 24px;
    }
    .total-label { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; color: rgba(255,255,255,0.75); }
    .total-value { font-size: 48px; font-weight: 700; color: #fff; margin-top: 8px; line-height: 1; }
    .total-currency { font-size: 24px; color: rgba(255,255,255,0.8); }

    .footer {
      margin-top: 48px;
      padding-top: 20px;
      border-top: 1px solid #E7E5E4;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .footer-note { font-size: 11px; color: #A8A29E; }
    .footer-brand { font-size: 12px; font-weight: 600; color: #EA580C; }
    .signature-area { margin-top: 32px; }
    .signature-line { border-top: 1px solid #D4C9C6; width: 200px; margin-top: 48px; }
    .signature-label { font-size: 11px; color: #A8A29E; margin-top: 6px; }
  </style>
</head>
<body>
  <div class="header">
    <div class="header-left">
      ${logoHtml}
      <div>
        ${companyBlock}
      </div>
    </div>
    <div>
      <div class="doc-title">WYCENA / ESTIMATE</div>
      <div class="doc-id">#${estimate.id.slice(-6).toUpperCase()}</div>
      <div class="doc-date">${fmtDate(estimate.createdAt)}</div>
    </div>
  </div>

  ${estimate.label ? `<div style="font-size:13px;color:#78716C;margin-bottom:20px;">📋 ${estimate.label}</div>` : ''}

  <div class="section-title">Rodzaj pracy / Work type</div>
  <div class="work-card">
    <div class="work-name">${estimate.workTypeName}</div>
    <div class="work-label">${estimate.currencyCode}</div>

    <div class="price-grid">
      <div class="price-cell">
        <div class="price-cell-label">Powierzchnia / Area</div>
        <div class="price-cell-value">${fmtNumber(estimate.area)} m²</div>
      </div>
      <div class="price-cell">
        <div class="price-cell-label">Stawka / Rate</div>
        <div class="price-cell-value">${fmtNumber(estimate.pricePerUnit)} ${estimate.currencySymbol}/m²</div>
      </div>
      <div class="price-cell">
        <div class="price-cell-label">Data / Date</div>
        <div class="price-cell-value" style="font-size:13px;">${fmtDate(estimate.createdAt)}</div>
      </div>
    </div>
  </div>

  <div class="total-card">
    <div class="total-label">Łączna kwota · Total amount</div>
    <div class="total-value">
      ${fmtNumber(estimate.totalPrice)} <span class="total-currency">${estimate.currencySymbol}</span>
    </div>
  </div>

  <div class="signature-area">
    <div style="display:flex;gap:60px;margin-top:40px;">
      <div>
        <div class="signature-line"></div>
        <div class="signature-label">Wykonawca / Contractor</div>
      </div>
      <div>
        <div class="signature-line"></div>
        <div class="signature-label">Zamawiający / Client</div>
      </div>
    </div>
  </div>

  <div class="footer">
    <div class="footer-note">Wycena wygenerowana przez BuildCalc · ${fmtDate(new Date().toISOString())}</div>
    <div class="footer-brand">BuildCalc</div>
  </div>
</body>
</html>`;

  try {
    const { uri } = await Print.printToFileAsync({ html, base64: false });
    const canShare = await Sharing.isAvailableAsync();
    if (canShare) {
      await Sharing.shareAsync(uri, {
        mimeType: 'application/pdf',
        dialogTitle: 'Udostępnij wycenę',
        UTI: 'com.adobe.pdf',
      });
    } else {
      await Print.printAsync({ uri });
    }
  } catch (err) {
    // Fallback: direct print
    await Print.printAsync({ html });
  }
}
