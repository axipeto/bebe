// Código para colar no Google Apps Script da planilha (Extensões → Apps Script).
// Cada resposta vira uma linha na aba "Confirmações": Data | Nome | Palpite | Presença.

const ABA = 'Confirmações';

function doGet(e) {
  const p = e.parameter || {};
  let resposta;
  if (p.action === 'confirmar') {
    resposta = confirmar(p.nome, p.palpite, p.presenca);
  } else {
    resposta = Object.assign({ ok: true }, placar());
  }
  return responder(resposta, p.callback);
}

function confirmar(nome, palpite, presenca) {
  nome = String(nome || '').trim().slice(0, 60);
  if (!nome) return { ok: false, erro: 'nome' };
  if (palpite !== 'menina' && palpite !== 'menino') return { ok: false, erro: 'palpite' };
  if (presenca !== 'sim' && presenca !== 'nao') return { ok: false, erro: 'presenca' };
  // evita que um nome começando com = + - @ seja lido como fórmula
  if (/^[=+\-@]/.test(nome)) nome = "'" + nome;

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    aba().appendRow([new Date(), nome, palpite, presenca === 'sim' ? 'vai' : 'não vai']);
  } finally {
    lock.releaseLock();
  }
  return Object.assign({ ok: true }, placar());
}

function placar() {
  const linhas = aba().getDataRange().getValues().slice(1);
  const total = { menina: 0, menino: 0 };
  linhas.forEach(function (l) { if (total[l[2]] !== undefined) total[l[2]]++; });
  return total;
}

function aba() {
  const planilha = SpreadsheetApp.getActiveSpreadsheet();
  let a = planilha.getSheetByName(ABA);
  if (!a) {
    a = planilha.insertSheet(ABA);
    a.appendRow(['Data', 'Nome', 'Palpite', 'Presença']);
  } else if (a.getRange(1, 4).getValue() === '') {
    a.getRange(1, 4).setValue('Presença'); // planilhas criadas antes da coluna nova
  }
  return a;
}

function responder(obj, callback) {
  const json = JSON.stringify(obj);
  // só aceita nomes de callback simples (proteção contra injeção)
  if (callback && /^[A-Za-z0-9_]{1,40}$/.test(callback)) {
    return ContentService.createTextOutput(callback + '(' + json + ')')
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
  return ContentService.createTextOutput(json).setMimeType(ContentService.MimeType.JSON);
}
