import { useState, useRef, useEffect } from "react";

const SF_YELLOW = "#FFD700";
const SF_BLACK = "#1A1A1A";
const SF_DARK_GRAY = "#2C2C2C";

const LOGO_SRC = "data:image/png;base64,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";

const SmartFitLogo = ({ size = 36 }) => (
  <img src={LOGO_SRC} alt="Smart Fit" style={{ height: size * 1.4, width: "auto", objectFit: "contain" }} />
);

const USERS = [
  { id: 1, nome: "Ana Lima", login: "ana.lima", senha: "123", role: "estagiario", estId: 1 },
  { id: 2, nome: "Bruno Souza", login: "bruno.souza", senha: "123", role: "estagiario", estId: 2 },
  { id: 3, nome: "Camila Rocha", login: "camila.rocha", senha: "123", role: "estagiario", estId: 3 },
  { id: 4, nome: "Carlos Mendes", login: "carlos.mendes", senha: "lider123", role: "lider", unidade: "Paulista" },
  { id: 5, nome: "Admin Geral", login: "admin", senha: "admin123", role: "admin" },
];

const initialUnidades = [
  { id: 1, nome: "Paulista", cidade: "São Paulo" },
  { id: 2, nome: "Clube Homs", cidade: "São Paulo" },
  { id: 3, nome: "Alameda Santos", cidade: "São Paulo" },
];

const STATUS_CONFIG = {
  "Em andamento": { bg: "#E6F1FB", color: "#185FA5", border: "#B5D4F4" },
  "Atenção": { bg: "#FFF3CD", color: "#856404", border: "#FFD700" },
  "Concluído": { bg: "#EAF3DE", color: "#3B6D11", border: "#C0DD97" },
};

const TRILHA = [
  { modulo: "Módulo 1: Gestão Operacional", sub: "O domínio da unidade como base para um atendimento eficiente e seguro.", temas: ["Setorização — Musculação, Cárdio, Peso Livre e Alongamento", "Posicionamento no salão para visibilidade máxima de alunos", "Segurança — Protocolos de emergência e prevenção de acidentes"] },
  { modulo: "Módulo 2: Soft Skills", sub: "Atendimento Proativo e a Arte da Fidelização Smart.", temas: ["Atendimento Proativo — Leitura corporal e abordagem antecipada", "Comunicação Não-Violenta — Correção técnica e empática"] },
  { modulo: "Módulo 3: Conteúdo Técnico", sub: "O alicerce científico para a prescrição e acompanhamento seguro.", temas: ["Biomecânica e Anatomia — Grandes grupos musculares e vetores de força", "Análise do Movimento — Braços de alavanca e fisiologia", "Metodologia de Treinamento — Adaptação, Hipertrofia e Controle de Carga"] },
  { modulo: "Módulo 4: Intervenção Prática", sub: "Transformando teoria em resultados reais no salão.", temas: ["Anamnese e Progressão — Perguntas-chave e adaptação", "Exercícios para alunos com limitações motoras", "Acessórios (Kettlebells, TRX, Elásticos) como diferenciação"] },
];

const initialEstagiarios = [
  { id: 1, nome: "Ana Lima", unidade: "Paulista", cidade: "São Paulo", periodo: "2025.1", status: "Em andamento", initials: "AL", tarefas: [{ id: 1, texto: "Participar da abertura da unidade", feito: true }, { id: 2, texto: "Conduzir abordagem proativa supervisionada", feito: false }, { id: 3, texto: "Registrar observações do salão no diário", feito: true }], evolucao: { abordagens: { valor: 38, meta: 60 }, correcoes: { valor: 22, meta: 40 }, modulos: { valor: 2, meta: 4 } }, trilhaStatus: { 0: [true, true, false], 1: [true, true], 2: [false, false, false], 3: [false, false, false] }, presencas: [{ id: 1, evento: "Reunião semanal", data: "05/05/2025", presente: true, comentario: "" }, { id: 2, evento: "Treinamento operacional", data: "12/05/2025", presente: true, comentario: "" }, { id: 3, evento: "Reunião mensal", data: "19/05/2025", presente: false, comentario: "Atestado médico apresentado." }], feedbacks: [{ id: 1, autor: "Carlos Mendes", cargo: "Líder da Unidade", data: "10/05/2025", nota: 4, texto: "Boa postura no salão. Continuar desenvolvendo abordagem proativa." }], satisfacao: { lider: { respondido: true, nota: 4, pontos: "Comprometida e pontual.", melhoria: "Comunicação com a equipe." }, estagiario: { respondido: true, nota: 5, pontos: "Aprendi muito sobre posicionamento.", melhoria: "Mais feedbacks estruturados." } } },
  { id: 2, nome: "Bruno Souza", unidade: "Clube Homs", cidade: "São Paulo", periodo: "2025.1", status: "Atenção", initials: "BS", tarefas: [{ id: 1, texto: "Ler manual de setorização", feito: false }, { id: 2, texto: "Registrar fichas de presença", feito: false }, { id: 3, texto: "Participar de abertura da unidade", feito: true }], evolucao: { abordagens: { valor: 8, meta: 60 }, correcoes: { valor: 3, meta: 40 }, modulos: { valor: 1, meta: 4 } }, trilhaStatus: { 0: [true, false, false], 1: [false, false], 2: [false, false, false], 3: [false, false, false] }, presencas: [{ id: 1, evento: "Reunião semanal", data: "05/05/2025", presente: false, comentario: "Sem justificativa." }, { id: 2, evento: "Treinamento operacional", data: "12/05/2025", presente: false, comentario: "Avisou no dia anterior." }, { id: 3, evento: "Reunião mensal", data: "19/05/2025", presente: true, comentario: "" }], feedbacks: [{ id: 1, autor: "Carlos Mendes", cargo: "Líder da Unidade", data: "15/05/2025", nota: 2, texto: "Frequência irregular. Necessita comprometimento." }], satisfacao: { lider: { respondido: false }, estagiario: { respondido: false } } },
  { id: 3, nome: "Camila Rocha", unidade: "Alameda Santos", cidade: "São Paulo", periodo: "2025.1", status: "Concluído", initials: "CR", tarefas: [{ id: 1, texto: "Apresentar relatório final", feito: true }, { id: 2, texto: "Devolutiva com líder", feito: true }, { id: 3, texto: "Encerrar registros", feito: true }], evolucao: { abordagens: { valor: 60, meta: 60 }, correcoes: { valor: 40, meta: 40 }, modulos: { valor: 4, meta: 4 } }, trilhaStatus: { 0: [true, true, true], 1: [true, true], 2: [true, true, true], 3: [true, true, true] }, presencas: [{ id: 1, evento: "Reunião semanal", data: "05/05/2025", presente: true, comentario: "" }, { id: 2, evento: "Treinamento operacional", data: "12/05/2025", presente: true, comentario: "" }, { id: 3, evento: "Reunião mensal", data: "19/05/2025", presente: true, comentario: "" }], feedbacks: [{ id: 1, autor: "Carlos Mendes", cargo: "Líder da Unidade", data: "28/05/2025", nota: 5, texto: "Excelente estagiária. Superou todas as expectativas." }], satisfacao: { lider: { respondido: true, nota: 5, pontos: "Dedicação exemplar. Recomendamos para contratação.", melhoria: "Nenhum ponto crítico." }, estagiario: { respondido: true, nota: 5, pontos: "Programa muito completo.", melhoria: "Mais rotação entre unidades." } } },
];

const colorFor = (i) => [{ bg: "#2a3a2a", color: SF_YELLOW }, { bg: "#1a2a3a", color: "#60BFFF" }, { bg: "#2a1a2a", color: "#FF80C0" }, { bg: "#2a2a1a", color: SF_YELLOW }][i.charCodeAt(0) % 4];
const Stars = ({ nota, onChange }: any) => <span style={{ display: "inline-flex", gap: 2 }}>{[1,2,3,4,5].map(i => <span key={i} onClick={() => onChange && onChange(i)} style={{ fontSize: 18, cursor: onChange ? "pointer" : "default", color: i <= nota ? SF_YELLOW : "#555" }}>★</span>)}</span>;
const RadialKPI = ({ label, valor, meta, color }: any) => { const pct = Math.min(1, valor / meta); const r = 34, cx = 42, cy = 42, sw = 7, circ = 2 * Math.PI * r; return <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}><svg width={84} height={84}><circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth={sw} /><circle cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth={sw} strokeDasharray={`${pct * circ} ${circ}`} strokeLinecap="round" transform={`rotate(-90 ${cx} ${cy})`} /><text x={cx} y={cy - 5} textAnchor="middle" fontSize={14} fontWeight={700} fill="#fff">{valor}</text><text x={cx} y={cy + 10} textAnchor="middle" fontSize={10} fill="rgba(255,255,255,0.5)">/{meta}</text></svg><span style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", textAlign: "center", maxWidth: 76 }}>{label}</span></div>; };

const useIsMobile = () => { const [m, setM] = useState(window.innerWidth <= 600); useEffect(() => { const fn = () => setM(window.innerWidth <= 600); window.addEventListener("resize", fn); return () => window.removeEventListener("resize", fn); }, []); return m; };

const sf: any = { color: "#fff", fontFamily: "Arial, sans-serif" };
const darkCard = (s: any = {}) => ({ background: SF_DARK_GRAY, border: "0.5px solid rgba(255,215,0,0.15)", borderRadius: 12, padding: "1rem 1.25rem", ...s });
const yellowBtn = (s: any = {}) => ({ background: SF_YELLOW, color: SF_BLACK, border: "none", borderRadius: 8, padding: "8px 18px", fontSize: 13, fontWeight: 700, cursor: "pointer", ...s });
const ghostBtn = (s: any = {}) => ({ background: "transparent", color: "#fff", border: "0.5px solid rgba(255,255,255,0.2)", borderRadius: 8, padding: "6px 14px", fontSize: 13, cursor: "pointer", ...s });
const redBtn = (s: any = {}) => ({ background: "rgba(255,80,80,0.15)", color: "#ff6b6b", border: "0.5px solid rgba(255,80,80,0.3)", borderRadius: 8, padding: "6px 14px", fontSize: 13, cursor: "pointer", ...s });
const darkInp: any = { width: "100%", fontSize: 13, padding: "9px 12px", borderRadius: 8, border: "0.5px solid rgba(255,215,0,0.3)", background: "rgba(255,255,255,0.06)", color: "#fff", boxSizing: "border-box" };

const ConfirmModal = ({ msg, onConfirm, onCancel }: any) => (
  <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 2000, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
    <div style={{ background: SF_DARK_GRAY, border: "1px solid rgba(255,80,80,0.3)", borderRadius: 12, padding: "24px", maxWidth: 340, width: "100%", textAlign: "center" }}>
      <div style={{ fontSize: 32, marginBottom: 12 }}>⚠️</div>
      <div style={{ fontSize: 14, color: "#fff", marginBottom: 20, lineHeight: 1.6 }}>{msg}</div>
      <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
        <button onClick={onCancel} style={ghostBtn()}>Cancelar</button>
        <button onClick={onConfirm} style={redBtn({ padding: "8px 20px", fontWeight: 700 })}>Confirmar exclusão</button>
      </div>
    </div>
  </div>
);

const GerenciarUnidades = ({ unidades, setUnidades, ests, onClose }: any) => {
  const [formNova, setFormNova] = useState({ nome: "", cidade: "São Paulo" });
  const [editando, setEditando] = useState<number | null>(null);
  const [formEdit, setFormEdit] = useState({ nome: "", cidade: "" });
  const [confirmDel, setConfirmDel] = useState<any>(null);
  const isMobile = useIsMobile();

  const salvarNova = () => { if (!formNova.nome.trim()) return; setUnidades((p: any) => [...p, { id: Date.now(), nome: formNova.nome.trim(), cidade: formNova.cidade }]); setFormNova({ nome: "", cidade: "São Paulo" }); };
  const iniciarEdit = (u: any) => { setEditando(u.id); setFormEdit({ nome: u.nome, cidade: u.cidade }); };
  const salvarEdit = (id: number) => { if (!formEdit.nome.trim()) return; setUnidades((p: any) => p.map((u: any) => u.id === id ? { ...u, nome: formEdit.nome.trim(), cidade: formEdit.cidade } : u)); setEditando(null); };
  const excluirUnidade = (u: any) => { const v = ests.filter((e: any) => e.unidade === u.nome).length; if (v > 0) { setConfirmDel({ id: u.id, nome: u.nome, vinculados: v }); } else { setUnidades((p: any) => p.filter((x: any) => x.id !== u.id)); } };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", zIndex: 1000, display: "flex", flexDirection: "column", alignItems: "center", overflow: "auto" }}>
      {confirmDel && <ConfirmModal msg={`A unidade "${confirmDel.nome}" tem ${confirmDel.vinculados} estagiário(s) vinculado(s). Excluir mesmo assim?`} onConfirm={() => { setUnidades((p: any) => p.filter((x: any) => x.id !== confirmDel.id)); setConfirmDel(null); }} onCancel={() => setConfirmDel(null)} />}
      <div style={{ position: "sticky", top: 0, zIndex: 10, background: SF_BLACK, borderBottom: `2px solid ${SF_YELLOW}`, width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: isMobile ? "10px 12px" : "12px 24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}><SmartFitLogo size={isMobile ? 18 : 22} /><span style={{ color: SF_YELLOW, fontSize: isMobile ? 12 : 14, fontWeight: 700 }}>Gerenciar Unidades</span></div>
        <button onClick={onClose} style={ghostBtn({ fontSize: 12 })}>✕ Fechar</button>
      </div>
      <div style={{ width: "100%", maxWidth: 560, padding: isMobile ? "16px 12px" : "24px 16px" }}>
        <div style={darkCard({ marginBottom: 20 })}>
          <div style={{ fontSize: 13, fontWeight: 700, color: SF_YELLOW, marginBottom: 12 }}>+ Nova unidade</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" as any }}>
            <input value={formNova.nome} onChange={e => setFormNova({ ...formNova, nome: e.target.value })} placeholder="Nome da unidade" style={{ ...darkInp, flex: 2, minWidth: 140 }} />
            <input value={formNova.cidade} onChange={e => setFormNova({ ...formNova, cidade: e.target.value })} placeholder="Cidade" style={{ ...darkInp, flex: 1, minWidth: 100 }} />
            <button onClick={salvarNova} style={yellowBtn({ flexShrink: 0 })}>Cadastrar</button>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" as any, gap: 10 }}>
          {unidades.map((u: any) => {
            const vinculados = ests.filter((e: any) => e.unidade === u.nome);
            return (
              <div key={u.id} style={darkCard({ padding: "14px 16px" })}>
                {editando === u.id ? (
                  <div style={{ display: "flex", flexDirection: "column" as any, gap: 8 }}>
                    <input value={formEdit.nome} onChange={e => setFormEdit({ ...formEdit, nome: e.target.value })} style={darkInp} />
                    <input value={formEdit.cidade} onChange={e => setFormEdit({ ...formEdit, cidade: e.target.value })} style={darkInp} />
                    <div style={{ display: "flex", gap: 8 }}><button onClick={() => salvarEdit(u.id)} style={yellowBtn()}>Salvar</button><button onClick={() => setEditando(null)} style={ghostBtn()}>Cancelar</button></div>
                  </div>
                ) : (
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 15, fontWeight: 700, color: "#fff" }}>Smart Fit {u.nome}</div>
                      <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>{u.cidade} · {vinculados.length} estagiário(s)</div>
                      {vinculados.length > 0 && <div style={{ display: "flex", flexWrap: "wrap" as any, gap: 4, marginTop: 6 }}>{vinculados.map((e: any) => <span key={e.id} style={{ fontSize: 10, background: "rgba(255,215,0,0.1)", color: SF_YELLOW, borderRadius: 4, padding: "2px 8px" }}>{e.nome}</span>)}</div>}
                    </div>
                    <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                      <button onClick={() => iniciarEdit(u)} style={ghostBtn({ fontSize: 11, padding: "5px 10px" })}>✏️ Editar</button>
                      <button onClick={() => excluirUnidade(u)} style={redBtn({ fontSize: 11, padding: "5px 10px" })}>🗑 Excluir</button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const PDFReport = ({ ests, onClose }: any) => {
  const printRef = useRef<any>();
  const isMobile = useIsMobile();
  const handlePrint = () => { const c = printRef.current.innerHTML; const w = window.open("", "_blank") as any; w.document.write(`<!DOCTYPE html><html><head><meta charset="utf-8"><title>Relatório — Smart Fit</title><style>*{box-sizing:border-box;margin:0;padding:0;}body{font-family:Arial,sans-serif;background:#fff;color:#1a1a1a;font-size:11px;}@media print{body{-webkit-print-color-adjust:exact;print-color-adjust:exact;}}</style></head><body>${c}</body></html>`); w.document.close(); setTimeout(() => w.print(), 400); };
  const hoje = new Date().toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });
  const totalFbs = ests.flatMap((e: any) => e.feedbacks.map((f: any) => f.nota));
  const mediaGeral = totalFbs.length ? (totalFbs.reduce((a: number, b: number) => a + b, 0) / totalFbs.length).toFixed(1) : "—";
  const presTotal = ests.flatMap((e: any) => e.presencas);
  const presRate = presTotal.length ? Math.round((presTotal.filter((p: any) => p.presente).length / presTotal.length) * 100) : 0;
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", zIndex: 1000, display: "flex", flexDirection: "column", alignItems: "center", overflow: "auto" }}>
      <div style={{ position: "sticky", top: 0, zIndex: 10, background: SF_BLACK, borderBottom: `2px solid ${SF_YELLOW}`, width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: isMobile ? "10px 12px" : "12px 24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}><SmartFitLogo size={isMobile ? 18 : 24} />{!isMobile && <span style={{ color: "#fff", fontSize: 13 }}>Pré-visualização do relatório</span>}</div>
        <div style={{ display: "flex", gap: 8 }}><button onClick={onClose} style={ghostBtn({ fontSize: isMobile ? 11 : 13 })}>✕ Fechar</button><button onClick={handlePrint} style={{ ...yellowBtn(), fontSize: isMobile ? 12 : 14, padding: isMobile ? "8px 12px" : "10px 22px" }}>⬇ {isMobile ? "PDF" : "Exportar PDF"}</button></div>
      </div>
      <div ref={printRef} style={{ background: "#fff", width: isMobile ? "100%" : 794, boxShadow: "0 8px 40px rgba(0,0,0,0.4)" }}>
        <div style={{ background: "#1a1a1a", color: "#fff", padding: isMobile ? "32px 20px" : "60px 52px 40px", minHeight: isMobile ? 300 : 480, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <img src={LOGO_SRC} alt="Smart Fit" style={{ height: isMobile ? 28 : 44, marginBottom: isMobile ? 28 : 52, filter: "brightness(0) invert(1)" }} />
            <div style={{ fontSize: 9, letterSpacing: 3, color: SF_YELLOW, fontWeight: 700, marginBottom: 8 }}>RELATÓRIO EXECUTIVO</div>
            <div style={{ fontSize: isMobile ? 22 : 34, fontWeight: 900, color: SF_YELLOW, lineHeight: 1.1, marginBottom: 10 }}>Projeto Piloto<br />de Estagiários</div>
            <div style={{ fontSize: isMobile ? 12 : 15, color: "rgba(255,255,255,0.6)", marginBottom: 24 }}>Musculação · Rede Smart Fit</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", lineHeight: 2.2 }}>
              <div>Emitido em: <strong style={{ color: "rgba(255,255,255,0.7)" }}>{hoje}</strong></div>
              <div>Total de estagiários: <strong style={{ color: "rgba(255,255,255,0.7)" }}>{ests.length}</strong></div>
              <div>Unidades: <strong style={{ color: "rgba(255,255,255,0.7)" }}>{[...new Set(ests.map((e: any) => e.unidade))].join(", ")}</strong></div>
            </div>
          </div>
          <div style={{ borderTop: "1px solid rgba(255,215,0,0.25)", paddingTop: 16, fontSize: 10, color: "rgba(255,255,255,0.3)" }}>Documento confidencial · Uso interno · Grupo Smart Fit</div>
        </div>
        <div style={{ padding: isMobile ? "20px 16px" : "32px 40px" }}>
          <div style={{ fontSize: 9, letterSpacing: 2, color: SF_YELLOW, fontWeight: 700, marginBottom: 6, background: "#1a1a1a", padding: "6px 12px", borderRadius: 4 }}>SUMÁRIO EXECUTIVO</div>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4,1fr)", gap: isMobile ? 8 : 10, marginBottom: 24 }}>
            {[["ESTAGIÁRIOS", ests.length, "#185FA5"], ["MÉDIA FEEDBACKS", mediaGeral, "#F5A800"], ["TAXA PRESENÇA", `${presRate}%`, "#3B6D11"], ["FEEDBACKS", ests.reduce((a: number, e: any) => a + e.feedbacks.length, 0), "#534AB7"]].map(([l, v, c]: any) => (
              <div key={l} style={{ background: "#f8f8f8", border: "1px solid #eee", borderRadius: 8, padding: "12px 8px", textAlign: "center", borderTop: `3px solid ${c}` }}>
                <div style={{ fontSize: isMobile ? 22 : 28, fontWeight: 900, color: c }}>{v}</div>
                <div style={{ fontSize: 8, color: "#999", marginTop: 3, letterSpacing: 1, textTransform: "uppercase" }}>{l}</div>
              </div>
            ))}
          </div>
          {ests.map((e: any) => {
            const st = STATUS_CONFIG[e.status as keyof typeof STATUS_CONFIG];
            const trilhaCon = Object.values(e.trilhaStatus).flat().filter(Boolean).length;
            const trilhaTot = Object.values(e.trilhaStatus).flat().length;
            const presOk = e.presencas.filter((p: any) => p.presente).length;
            const tarefasOk = e.tarefas.filter((t: any) => t.feito).length;
            const ns = e.feedbacks.map((f: any) => f.nota);
            const mediaFb = ns.length ? (ns.reduce((a: number, b: number) => a + b, 0) / ns.length).toFixed(1) : "—";
            return (
              <div key={e.id} style={{ border: "1px solid #e0e0e0", borderRadius: 10, marginBottom: 20, overflow: "hidden" }}>
                <div style={{ background: "#1a1a1a", padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 6 }}>
                  <div><div style={{ fontSize: 15, fontWeight: 900, color: "#fff" }}>{e.nome}</div><div style={{ fontSize: 10, color: "rgba(255,255,255,0.5)" }}>Smart Fit {e.unidade} · {e.cidade}</div></div>
                  <div style={{ background: st.bg, color: st.color, border: `1px solid ${st.border}`, padding: "4px 12px", borderRadius: 20, fontSize: 10, fontWeight: 700 }}>{e.status}</div>
                </div>
                <div style={{ padding: "14px 16px" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8, marginBottom: 12 }}>
                    {[["Tarefas", `${tarefasOk}/${e.tarefas.length}`, tarefasOk / Math.max(e.tarefas.length, 1), "#185FA5"], ["Presenças", `${presOk}/${e.presencas.length}`, presOk / Math.max(e.presencas.length, 1), "#3B6D11"], ["Trilha", `${trilhaCon}/${trilhaTot}`, trilhaCon / Math.max(trilhaTot, 1), "#534AB7"], ["Nota", mediaFb, ns.length ? parseFloat(mediaFb) / 5 : 0, "#F5A800"]].map(([l, v, pct, c]: any) => (
                      <div key={l} style={{ background: "#f8f8f8", border: "1px solid #eee", borderRadius: 6, padding: "8px", textAlign: "center" }}>
                        <div style={{ fontSize: 18, fontWeight: 900, color: c }}>{v}</div>
                        <div style={{ fontSize: 8, color: "#aaa", textTransform: "uppercase", marginTop: 2 }}>{l}</div>
                        <div style={{ height: 3, background: "#eee", borderRadius: 2, marginTop: 4 }}><div style={{ width: `${Math.min(100, Math.round(pct * 100))}%`, height: "100%", background: c }} /></div>
                      </div>
                    ))}
                  </div>
                  {e.feedbacks.length > 0 && e.feedbacks.map((f: any) => (
                    <div key={f.id} style={{ background: "#f9f9f9", border: "1px solid #eee", borderRadius: 6, padding: "8px 10px", marginBottom: 6 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}><span style={{ fontSize: 10, fontWeight: 700 }}>{f.autor}</span><span style={{ color: "#F5A800", fontSize: 11 }}>{"★".repeat(f.nota)}{"☆".repeat(5 - f.nota)}</span></div>
                      <div style={{ fontSize: 10, color: "#555" }}>{f.texto}</div>
                    </div>
                  ))}
                  {(e.satisfacao.lider.respondido || e.satisfacao.estagiario.respondido) && (
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 8 }}>
                      {e.satisfacao.lider.respondido && <div style={{ background: "#f9f9f9", border: "1px solid #eee", borderRadius: 6, padding: "8px" }}><div style={{ fontSize: 9, fontWeight: 700, color: "#185FA5", marginBottom: 4 }}>LÍDER</div><div style={{ fontSize: 18, fontWeight: 900, color: "#F5A800" }}>{e.satisfacao.lider.nota}/5</div><div style={{ fontSize: 9, color: "#666", marginTop: 4 }}>+ {e.satisfacao.lider.pontos}</div></div>}
                      {e.satisfacao.estagiario.respondido && <div style={{ background: "#f9f9f9", border: "1px solid #eee", borderRadius: 6, padding: "8px" }}><div style={{ fontSize: 9, fontWeight: 700, color: "#3B6D11", marginBottom: 4 }}>ESTAGIÁRIO</div><div style={{ fontSize: 18, fontWeight: 900, color: "#F5A800" }}>{e.satisfacao.estagiario.nota}/5</div><div style={{ fontSize: 9, color: "#666", marginTop: 4 }}>+ {e.satisfacao.estagiario.pontos}</div></div>}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
          <div style={{ borderTop: "1px solid #eee", paddingTop: 12, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
            <img src={LOGO_SRC} alt="Smart Fit" style={{ height: 18, filter: "brightness(0)" }} />
            <div style={{ fontSize: 9, color: "#bbb" }}>Relatório gerado em {hoje} · Grupo Smart Fit · Confidencial</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [user, setUser] = useState<any>(null);
  const [loginInput, setLoginInput] = useState({ login: "", senha: "" });
  const [loginErr, setLoginErr] = useState("");
  const [ests, setEsts] = useState<any[]>(initialEstagiarios);
  const [unidades, setUnidades] = useState<any[]>(initialUnidades);
  const [sel, setSel] = useState<number | null>(null);
  const [aba, setAba] = useState("Tarefas");
  const [view, setView] = useState("home");
  const [showPDF, setShowPDF] = useState(false);
  const [showUnidades, setShowUnidades] = useState(false);
  const [moduloAberto, setModuloAberto] = useState<number | null>(null);
  const [filtros, setFiltros] = useState({ unidade: "Todas", periodo: "Todos", status: "Todos" });
  const [formNovo, setFormNovo] = useState({ nome: "", unidadeId: "", periodo: "2025.1", status: "Em andamento" });
  const [formFb, setFormFb] = useState({ autor: "", cargo: "Líder da Unidade", nota: 5, texto: "" });
  const [showFbForm, setShowFbForm] = useState(false);
  const [formLider, setFormLider] = useState({ nota: 5, pontos: "", melhoria: "" });
  const [formEst, setFormEst] = useState({ nota: 5, pontos: "", melhoria: "" });
  const [showLiderForm, setShowLiderForm] = useState(false);
  const [showEstForm, setShowEstForm] = useState(false);
  const [novaTarefa, setNovaTarefa] = useState("");
  const [showTF, setShowTF] = useState(false);
  const [novaP, setNovaP] = useState({ evento: "", data: "", presente: true, comentario: "" });
  const [showPF, setShowPF] = useState(false);
  const [confirmDelEst, setConfirmDelEst] = useState(false);
  const [showTransferir, setShowTransferir] = useState(false);
  const [novaUnidadeTransf, setNovaUnidadeTransf] = useState("");
  const isMobile = useIsMobile();

  const upd = (id: number, fn: any) => setEsts(p => p.map(e => e.id === id ? fn(e) : e));
  const est = sel !== null ? ests.find(e => e.id === sel) : null;
  const canEdit = user?.role !== "estagiario";
  const isMyProfile = user?.role === "estagiario" && est?.id === user.estId;
  const myEsts = user?.role === "estagiario" ? ests.filter(e => e.id === user.estId) : user?.role === "lider" ? ests.filter(e => e.unidade === user.unidade) : ests;
  const unidadesFiltro = [...new Set(myEsts.map(e => e.unidade))];
  const filtrados = myEsts.filter(e =>
    (filtros.unidade === "Todas" || e.unidade === filtros.unidade) &&
    (filtros.periodo === "Todos" || e.periodo === filtros.periodo) &&
    (filtros.status === "Todos" || e.status === filtros.status)
  );
  const ABAS = user?.role === "estagiario" ? ["Tarefas", "Evolução", "Trilha", "Presenças", "Satisfação"] : ["Tarefas", "Evolução", "Trilha", "Presenças", "Feedbacks", "Satisfação"];

  const doLogin = () => { const u = USERS.find(u => u.login === loginInput.login && u.senha === loginInput.senha); if (u) { setUser(u); setLoginErr(""); } else setLoginErr("Login ou senha incorretos."); };
  const doLogout = () => { setUser(null); setLoginInput({ login: "", senha: "" }); setSel(null); setView("home"); };
  const excluirEstagiario = () => { setEsts(p => p.filter(e => e.id !== est.id)); setConfirmDelEst(false); setView("home"); setSel(null); };
  const transferirEstagiario = () => { if (!novaUnidadeTransf) return; const u = unidades.find(u => u.id === parseInt(novaUnidadeTransf)); if (!u) return; upd(est.id, e => ({ ...e, unidade: u.nome, cidade: u.cidade })); setShowTransferir(false); setNovaUnidadeTransf(""); };

  if (!user) return (
    <div style={{ minHeight: 500, background: SF_BLACK, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2rem 1rem", fontFamily: "Arial, sans-serif" }}>
      <div style={{ marginBottom: 28 }}><SmartFitLogo size={36} /></div>
      <div style={{ width: "100%", maxWidth: 360, background: SF_DARK_GRAY, borderRadius: 16, padding: "1.75rem", border: "1px solid rgba(255,215,0,0.2)" }}>
        <div style={{ fontSize: 11, color: SF_YELLOW, fontWeight: 700, letterSpacing: 2, marginBottom: 4 }}>PROGRAMA DE ESTÁGIO</div>
        <div style={{ fontSize: 20, fontWeight: 700, color: "#fff", marginBottom: 24 }}>Acesse sua conta</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div><div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", marginBottom: 4, fontWeight: 700, letterSpacing: 1 }}>LOGIN</div><input value={loginInput.login} onChange={e => setLoginInput({ ...loginInput, login: e.target.value })} onKeyDown={e => e.key === "Enter" && doLogin()} placeholder="seu.login" style={darkInp} /></div>
          <div><div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", marginBottom: 4, fontWeight: 700, letterSpacing: 1 }}>SENHA</div><input type="password" value={loginInput.senha} onChange={e => setLoginInput({ ...loginInput, senha: e.target.value })} onKeyDown={e => e.key === "Enter" && doLogin()} placeholder="••••••" style={darkInp} /></div>
          {loginErr && <div style={{ fontSize: 12, color: SF_YELLOW, background: "rgba(255,215,0,0.08)", padding: "8px 10px", borderRadius: 6 }}>{loginErr}</div>}
          <button onClick={doLogin} style={{ ...yellowBtn(), padding: "10px", fontSize: 14, marginTop: 4 }}>Entrar</button>
        </div>
      </div>
    </div>
  );

  if (showPDF) return <PDFReport ests={myEsts} onClose={() => setShowPDF(false)} />;
  if (showUnidades) return <GerenciarUnidades unidades={unidades} setUnidades={setUnidades} ests={ests} onClose={() => setShowUnidades(false)} />;

  if (view === "novoEst") return (
    <div style={{ background: SF_BLACK, minHeight: 500, ...sf, padding: "1rem" }}>
      <div style={{ maxWidth: 480, margin: "0 auto" }}>
        <button onClick={() => setView("home")} style={{ ...ghostBtn(), marginBottom: 20 }}>← Voltar</button>
        <div style={darkCard()}>
          <div style={{ fontWeight: 700, fontSize: 16, color: SF_YELLOW, marginBottom: 16 }}>Cadastrar novo estagiário</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div><div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginBottom: 4, fontWeight: 700, letterSpacing: 1 }}>NOME COMPLETO</div><input value={formNovo.nome} onChange={e => setFormNovo({ ...formNovo, nome: e.target.value })} placeholder="Ex: João da Silva" style={darkInp} /></div>
            <div><div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginBottom: 4, fontWeight: 700, letterSpacing: 1 }}>UNIDADE SMART FIT</div>
              <select value={formNovo.unidadeId} onChange={e => setFormNovo({ ...formNovo, unidadeId: e.target.value })} style={darkInp}>
                <option value="">Selecione uma unidade...</option>
                {unidades.map(u => <option key={u.id} value={u.id}>{u.nome} — {u.cidade}</option>)}
              </select>
            </div>
            <div><div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginBottom: 4, fontWeight: 700, letterSpacing: 1 }}>PERÍODO</div><input value={formNovo.periodo} onChange={e => setFormNovo({ ...formNovo, periodo: e.target.value })} placeholder="Ex: 2025.1" style={darkInp} /></div>
            <div><div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginBottom: 4, fontWeight: 700, letterSpacing: 1 }}>STATUS</div><select value={formNovo.status} onChange={e => setFormNovo({ ...formNovo, status: e.target.value })} style={darkInp}><option>Em andamento</option><option>Atenção</option><option>Concluído</option></select></div>
            <button onClick={() => { if (!formNovo.nome.trim() || !formNovo.unidadeId) return; const u = unidades.find(u => u.id === parseInt(formNovo.unidadeId)); if (!u) return; const novo = { id: Date.now(), nome: formNovo.nome, unidade: u.nome, cidade: u.cidade, periodo: formNovo.periodo, status: formNovo.status, initials: formNovo.nome.split(" ").slice(0, 2).map((w: string) => w[0]).join("").toUpperCase(), tarefas: [], evolucao: { abordagens: { valor: 0, meta: 60 }, correcoes: { valor: 0, meta: 40 }, modulos: { valor: 0, meta: 4 } }, trilhaStatus: { 0: [false, false, false], 1: [false, false], 2: [false, false, false], 3: [false, false, false] }, presencas: [], feedbacks: [], satisfacao: { lider: { respondido: false }, estagiario: { respondido: false } } }; setEsts(p => [...p, novo]); setFormNovo({ nome: "", unidadeId: "", periodo: "2025.1", status: "Em andamento" }); setView("home"); }} style={{ ...yellowBtn(), padding: "10px", fontSize: 14, marginTop: 4 }}>Cadastrar estagiário</button>
          </div>
        </div>
      </div>
    </div>
  );

  if (view === "detail" && est) {
    const av = colorFor(est.initials);
    const st = STATUS_CONFIG[est.status as keyof typeof STATUS_CONFIG];
    return (
      <div style={{ background: SF_BLACK, minHeight: 500, ...sf, padding: isMobile ? "0.75rem" : "1rem" }}>
        {confirmDelEst && <ConfirmModal msg={`Excluir "${est.nome}" permanentemente? Esta ação não pode ser desfeita.`} onConfirm={excluirEstagiario} onCancel={() => setConfirmDelEst(false)} />}
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14, flexWrap: "wrap" as any }}>
            <button onClick={() => { setView("home"); setAba("Tarefas"); setSel(null); }} style={ghostBtn({ fontSize: 12, padding: "5px 10px" })}>← Voltar</button>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: av.bg, border: `2px solid ${av.color}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: av.color, flexShrink: 0 }}>{est.initials}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 700, fontSize: isMobile ? 13 : 15, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{est.nome}</div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.5)" }}>Smart Fit {est.unidade} · {est.periodo}</div>
            </div>
            <div style={{ background: st.bg, color: st.color, border: `0.5px solid ${st.border}`, borderRadius: 6, fontSize: 10, padding: "3px 10px", fontWeight: 700, flexShrink: 0 }}>{est.status}</div>
          </div>

          {user.role === "admin" && (
            <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" as any }}>
              <button onClick={() => { setShowTransferir(!showTransferir); setNovaUnidadeTransf(""); }} style={ghostBtn({ fontSize: 12, padding: "5px 12px" })}>🔀 Transferir unidade</button>
              <button onClick={() => setConfirmDelEst(true)} style={redBtn({ fontSize: 12, padding: "5px 12px" })}>🗑 Excluir estagiário</button>
            </div>
          )}

          {showTransferir && user.role === "admin" && (
            <div style={{ ...darkCard({ marginBottom: 14 }), border: "0.5px solid rgba(255,215,0,0.3)" }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: SF_YELLOW, marginBottom: 10 }}>🔀 Transferir para outra unidade</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", marginBottom: 8 }}>Unidade atual: <strong style={{ color: "#fff" }}>Smart Fit {est.unidade}</strong></div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" as any }}>
                <select value={novaUnidadeTransf} onChange={e => setNovaUnidadeTransf(e.target.value)} style={{ ...darkInp, flex: 1 }}>
                  <option value="">Selecione a nova unidade...</option>
                  {unidades.filter(u => u.nome !== est.unidade).map(u => <option key={u.id} value={u.id}>{u.nome} — {u.cidade}</option>)}
                </select>
                <button onClick={transferirEstagiario} style={yellowBtn({ flexShrink: 0 })}>Confirmar</button>
                <button onClick={() => setShowTransferir(false)} style={ghostBtn({ flexShrink: 0 })}>Cancelar</button>
              </div>
            </div>
          )}

          <div style={{ display: "flex", gap: 6, marginBottom: 14, overflowX: "auto", paddingBottom: 4, WebkitOverflowScrolling: "touch" }}>
            {ABAS.map(a => <button key={a} onClick={() => setAba(a)} style={{ fontSize: 11, padding: "5px 12px", borderRadius: 20, border: `1px solid ${aba === a ? SF_YELLOW : "rgba(255,255,255,0.15)"}`, cursor: "pointer", background: aba === a ? SF_YELLOW : "transparent", color: aba === a ? SF_BLACK : "#fff", fontWeight: aba === a ? 700 : 400, whiteSpace: "nowrap", flexShrink: 0 }}>{a}</button>)}
          </div>

          {aba === "Tarefas" && (
            <div style={darkCard()}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: SF_YELLOW }}>Tarefas e atividades</span>
                {(canEdit || isMyProfile) && <button onClick={() => setShowTF(!showTF)} style={ghostBtn()}>+ Nova</button>}
              </div>
              {showTF && <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" as any }}><input value={novaTarefa} onChange={e => setNovaTarefa(e.target.value)} placeholder="Descreva a tarefa..." style={{ ...darkInp, flex: 1 }} /><button onClick={() => { if (!novaTarefa.trim()) return; upd(est.id, e => ({ ...e, tarefas: [...e.tarefas, { id: Date.now(), texto: novaTarefa.trim(), feito: false }] })); setNovaTarefa(""); setShowTF(false); }} style={yellowBtn()}>OK</button></div>}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {est.tarefas.map((t: any) => (
                  <div key={t.id} onClick={() => (canEdit || isMyProfile) && upd(est.id, e => ({ ...e, tarefas: e.tarefas.map((x: any) => x.id === t.id ? { ...x, feito: !x.feito } : x) }))} style={{ display: "flex", alignItems: "center", gap: 10, cursor: (canEdit || isMyProfile) ? "pointer" : "default", padding: "10px 12px", borderRadius: 8, background: t.feito ? "rgba(255,215,0,0.08)" : "rgba(255,255,255,0.04)", border: `0.5px solid ${t.feito ? "rgba(255,215,0,0.3)" : "rgba(255,255,255,0.08)"}` }}>
                    <div style={{ width: 18, height: 18, borderRadius: 4, border: `2px solid ${t.feito ? SF_YELLOW : "rgba(255,255,255,0.3)"}`, background: t.feito ? SF_YELLOW : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{t.feito && <span style={{ color: SF_BLACK, fontSize: 11, fontWeight: 900 }}>✓</span>}</div>
                    <span style={{ fontSize: 13, color: t.feito ? SF_YELLOW : "rgba(255,255,255,0.8)", textDecoration: t.feito ? "line-through" : "none" }}>{t.texto}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {aba === "Evolução" && (
            <div style={darkCard()}>
              <div style={{ fontWeight: 700, fontSize: 14, color: SF_YELLOW, marginBottom: 20 }}>Desempenho no programa</div>
              <div style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: 16, marginBottom: 24 }}>
                <RadialKPI label="Abordagens proativas" valor={est.evolucao.abordagens.valor} meta={est.evolucao.abordagens.meta} color={SF_YELLOW} />
                <RadialKPI label="Correções de movimento" valor={est.evolucao.correcoes.valor} meta={est.evolucao.correcoes.meta} color="#60BFFF" />
                <RadialKPI label="Módulos concluídos" valor={est.evolucao.modulos.valor} meta={est.evolucao.modulos.meta} color="#90EE90" />
              </div>
              {canEdit && <div style={{ borderTop: "0.5px solid rgba(255,215,0,0.15)", paddingTop: 16 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.5)", letterSpacing: 1, marginBottom: 10 }}>ATUALIZAR REGISTROS</div>
                {[["abordagens", "Abordagens proativas", 60], ["correcoes", "Correções de movimento", 40], ["modulos", "Módulos concluídos", 4]].map(([k, label, meta]: any) => (
                  <div key={k} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                    <span style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", flex: 1 }}>{label}</span>
                    <button onClick={() => upd(est.id, e => ({ ...e, evolucao: { ...e.evolucao, [k]: { ...e.evolucao[k], valor: Math.max(0, e.evolucao[k].valor - 1) } } }))} style={{ ...ghostBtn(), padding: "4px 14px", fontSize: 18 }}>−</button>
                    <span style={{ minWidth: 28, textAlign: "center", fontSize: 14, fontWeight: 700, color: SF_YELLOW }}>{est.evolucao[k].valor}</span>
                    <button onClick={() => upd(est.id, e => ({ ...e, evolucao: { ...e.evolucao, [k]: { ...e.evolucao[k], valor: Math.min(meta, e.evolucao[k].valor + 1) } } }))} style={{ ...ghostBtn(), padding: "4px 14px", fontSize: 18 }}>+</button>
                  </div>
                ))}
              </div>}
            </div>
          )}

          {aba === "Trilha" && (
            <div style={darkCard()}>
              <div style={{ fontWeight: 700, fontSize: 14, color: SF_YELLOW, marginBottom: 4 }}>Trilha pedagógica</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginBottom: 16 }}>Chancelada pela Faculdade Phorte</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {TRILHA.map((m, mi) => {
                  const temas = est.trilhaStatus[mi] || []; const concl = temas.filter(Boolean).length; const aberto = moduloAberto === mi; const pct = Math.round((concl / temas.length) * 100); const cor = pct === 100 ? "#90EE90" : pct > 0 ? SF_YELLOW : "rgba(255,255,255,0.3)";
                  return (
                    <div key={mi} style={{ border: `0.5px solid ${pct > 0 ? "rgba(255,215,0,0.3)" : "rgba(255,255,255,0.08)"}`, borderRadius: 10, overflow: "hidden" }}>
                      <div onClick={() => setModuloAberto(aberto ? null : mi)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", cursor: "pointer", background: "rgba(255,255,255,0.03)" }}>
                        <div style={{ width: 28, height: 28, borderRadius: "50%", border: `2px solid ${cor}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: cor, flexShrink: 0 }}>{mi + 1}</div>
                        <div style={{ flex: 1, minWidth: 0 }}><div style={{ fontSize: isMobile ? 12 : 13, fontWeight: 700, color: "#fff" }}>{m.modulo}</div><div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", marginTop: 1 }}>{m.sub}</div></div>
                        <span style={{ fontSize: 11, color: cor, fontWeight: 700, marginRight: 4 }}>{concl}/{temas.length}</span>
                        <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 12 }}>{aberto ? "▲" : "▼"}</span>
                      </div>
                      {aberto && <div style={{ padding: "10px 14px 12px", display: "flex", flexDirection: "column", gap: 8, background: "rgba(0,0,0,0.2)" }}>
                        {m.temas.map((tema, ti) => (
                          <div key={ti} onClick={() => { if (!canEdit && !isMyProfile) return; upd(est.id, e => { const ts = { ...e.trilhaStatus }; const arr = [...(ts[mi] || [])]; arr[ti] = !arr[ti]; const modConcl = Object.entries({ ...ts, [mi]: arr }).filter(([, v]: any) => v.every(Boolean)).length; return { ...e, trilhaStatus: { ...ts, [mi]: arr }, evolucao: { ...e.evolucao, modulos: { ...e.evolucao.modulos, valor: modConcl } } }; }); }} style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: (canEdit || isMyProfile) ? "pointer" : "default", padding: "8px 10px", borderRadius: 8, background: temas[ti] ? "rgba(255,215,0,0.07)" : "rgba(255,255,255,0.03)", border: `0.5px solid ${temas[ti] ? "rgba(255,215,0,0.2)" : "rgba(255,255,255,0.06)"}` }}>
                            <div style={{ width: 16, height: 16, borderRadius: 3, border: `2px solid ${temas[ti] ? SF_YELLOW : "rgba(255,255,255,0.2)"}`, background: temas[ti] ? SF_YELLOW : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>{temas[ti] && <span style={{ color: SF_BLACK, fontSize: 10, fontWeight: 900 }}>✓</span>}</div>
                            <span style={{ fontSize: 12, color: temas[ti] ? SF_YELLOW : "rgba(255,255,255,0.7)", lineHeight: 1.5 }}>{tema}</span>
                          </div>
                        ))}
                      </div>}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {aba === "Presenças" && (
            <div style={darkCard()}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: SF_YELLOW }}>Presenças</span>
                {canEdit && <button onClick={() => setShowPF(!showPF)} style={ghostBtn()}>+ Registrar</button>}
              </div>
              {showPF && <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 14, padding: "12px", background: "rgba(255,255,255,0.04)", borderRadius: 8 }}>
                <input value={novaP.evento} onChange={e => setNovaP({ ...novaP, evento: e.target.value })} placeholder="Nome do evento" style={darkInp} />
                <input value={novaP.data} onChange={e => setNovaP({ ...novaP, data: e.target.value })} placeholder="Data (ex: 30/05/2025)" style={darkInp} />
                <div style={{ display: "flex", gap: 8 }}><button onClick={() => setNovaP({ ...novaP, presente: true })} style={{ flex: 1, ...(novaP.presente ? yellowBtn() : ghostBtn()) }}>Presente</button><button onClick={() => setNovaP({ ...novaP, presente: false })} style={{ flex: 1, ...(!novaP.presente ? yellowBtn() : ghostBtn()) }}>Ausente</button></div>
                <textarea value={novaP.comentario} onChange={e => setNovaP({ ...novaP, comentario: e.target.value })} placeholder="Comentário..." rows={2} style={{ ...darkInp, resize: "vertical" }} />
                <button onClick={() => { if (!novaP.evento || !novaP.data) return; upd(est.id, e => ({ ...e, presencas: [...e.presencas, { ...novaP, id: Date.now() }] })); setNovaP({ evento: "", data: "", presente: true, comentario: "" }); setShowPF(false); }} style={yellowBtn()}>Salvar</button>
              </div>}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {est.presencas.map((p: any) => (
                  <div key={p.id} style={{ padding: "10px 12px", borderRadius: 8, background: p.presente ? "rgba(144,238,144,0.08)" : "rgba(255,100,100,0.08)", border: `0.5px solid ${p.presente ? "rgba(144,238,144,0.3)" : "rgba(255,100,100,0.3)"}` }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontSize: 14, color: p.presente ? "#90EE90" : "#FF8080" }}>{p.presente ? "✓" : "✗"}</span>
                      <div style={{ flex: 1 }}><div style={{ fontSize: 13, color: "#fff" }}>{p.evento}</div><div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>{p.data}</div></div>
                      <span style={{ fontSize: 11, fontWeight: 700, color: p.presente ? "#90EE90" : "#FF8080" }}>{p.presente ? "Presente" : "Ausente"}</span>
                    </div>
                    {p.comentario && <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginTop: 6, paddingTop: 6, borderTop: "0.5px solid rgba(255,255,255,0.08)" }}>💬 {p.comentario}</div>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {aba === "Feedbacks" && canEdit && (
            <div style={darkCard()}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: SF_YELLOW }}>Feedbacks</span>
                <button onClick={() => setShowFbForm(!showFbForm)} style={ghostBtn()}>+ Novo</button>
              </div>
              {showFbForm && <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 14, padding: "12px", background: "rgba(255,255,255,0.04)", borderRadius: 8 }}>
                <input value={formFb.autor} onChange={e => setFormFb({ ...formFb, autor: e.target.value })} placeholder="Seu nome" style={darkInp} />
                <select value={formFb.cargo} onChange={e => setFormFb({ ...formFb, cargo: e.target.value })} style={darkInp}><option>Líder da Unidade</option><option>Parceiro — Prof. Musculação</option><option>Parceiro — Recepcionista</option></select>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}><span style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>Nota:</span><Stars nota={formFb.nota} onChange={(n: number) => setFormFb({ ...formFb, nota: n })} /></div>
                <textarea value={formFb.texto} onChange={e => setFormFb({ ...formFb, texto: e.target.value })} placeholder="Escreva o feedback..." rows={3} style={{ ...darkInp, resize: "vertical" }} />
                <button onClick={() => { if (!formFb.autor || !formFb.texto) return; upd(est.id, e => ({ ...e, feedbacks: [...e.feedbacks, { ...formFb, id: Date.now(), data: new Date().toLocaleDateString("pt-BR") }] })); setFormFb({ autor: "", cargo: "Líder da Unidade", nota: 5, texto: "" }); setShowFbForm(false); }} style={yellowBtn()}>Salvar feedback</button>
              </div>}
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {est.feedbacks.map((f: any) => (
                  <div key={f.id} style={{ padding: "12px", borderRadius: 8, background: "rgba(255,255,255,0.04)", border: "0.5px solid rgba(255,215,0,0.1)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8, flexWrap: "wrap", gap: 6 }}>
                      <div><span style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{f.autor}</span><span style={{ fontSize: 11, color: SF_YELLOW, marginLeft: 8, background: "rgba(255,215,0,0.1)", borderRadius: 4, padding: "1px 6px" }}>{f.cargo}</span></div>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}><Stars nota={f.nota} /><span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>{f.data}</span></div>
                    </div>
                    <p style={{ fontSize: 13, margin: 0, color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>{f.texto}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {aba === "Satisfação" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[{ key: "lider", titulo: "Avaliação do líder", sub: "Como o líder avalia o estagiário", showS: showLiderForm, setShowS: setShowLiderForm, form: formLider, setForm: setFormLider, submit: () => { upd(est.id, e => ({ ...e, satisfacao: { ...e.satisfacao, lider: { respondido: true, ...formLider } } })); setShowLiderForm(false); }, canAnswer: canEdit, pL: "Pontos positivos", pM: "Pontos de melhoria" }, { key: "estagiario", titulo: "Avaliação do estagiário", sub: "O que o estagiário achou do programa", showS: showEstForm, setShowS: setShowEstForm, form: formEst, setForm: setFormEst, submit: () => { upd(est.id, e => ({ ...e, satisfacao: { ...e.satisfacao, estagiario: { respondido: true, ...formEst } } })); setShowEstForm(false); }, canAnswer: isMyProfile || canEdit, pL: "O que mais gostou?", pM: "Sugestões de melhoria" }].map(({ key, titulo, sub, showS, setShowS, form, setForm, submit, canAnswer, pL, pM }: any) => {
                const data = est.satisfacao[key];
                return (
                  <div key={key} style={darkCard()}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14, flexWrap: "wrap", gap: 8 }}>
                      <div><div style={{ fontWeight: 700, fontSize: 14, color: SF_YELLOW }}>{titulo}</div><div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>{sub}</div></div>
                      {!data.respondido && canAnswer && <button onClick={() => setShowS(!showS)} style={ghostBtn()}>Preencher</button>}
                    </div>
                    {data.respondido ? (
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px", borderRadius: 10, background: "rgba(255,215,0,0.06)", border: "0.5px solid rgba(255,215,0,0.2)", marginBottom: 12 }}>
                          <div style={{ fontSize: 40, fontWeight: 900, color: SF_YELLOW, lineHeight: 1 }}>{data.nota}</div>
                          <div><Stars nota={data.nota} /><div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>Nota {data.nota} de 5</div></div>
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 10 }}>
                          <div style={{ padding: "10px 12px", background: "rgba(144,238,144,0.08)", borderRadius: 8, border: "0.5px solid rgba(144,238,144,0.2)" }}><div style={{ fontSize: 10, color: "#90EE90", fontWeight: 700, letterSpacing: 1, marginBottom: 6 }}>PONTOS POSITIVOS</div><div style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", lineHeight: 1.5 }}>{data.pontos}</div></div>
                          <div style={{ padding: "10px 12px", background: "rgba(255,215,0,0.05)", borderRadius: 8, border: "0.5px solid rgba(255,215,0,0.15)" }}><div style={{ fontSize: 10, color: SF_YELLOW, fontWeight: 700, letterSpacing: 1, marginBottom: 6 }}>PONTOS DE MELHORIA</div><div style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", lineHeight: 1.5 }}>{data.melhoria}</div></div>
                        </div>
                      </div>
                    ) : showS && canAnswer ? (
                      <div style={{ display: "flex", flexDirection: "column", gap: 8, padding: "12px", background: "rgba(255,255,255,0.04)", borderRadius: 8 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}><span style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>Nota:</span><Stars nota={form.nota} onChange={(n: number) => setForm({ ...form, nota: n })} /></div>
                        <textarea value={form.pontos} onChange={e => setForm({ ...form, pontos: e.target.value })} placeholder={pL} rows={2} style={{ ...darkInp, resize: "vertical" }} />
                        <textarea value={form.melhoria} onChange={e => setForm({ ...form, melhoria: e.target.value })} placeholder={pM} rows={2} style={{ ...darkInp, resize: "vertical" }} />
                        <button onClick={submit} style={yellowBtn()}>Enviar avaliação</button>
                      </div>
                    ) : <div style={{ textAlign: "center", padding: "20px", color: "rgba(255,255,255,0.3)", fontSize: 13 }}>{canAnswer ? "Clique em 'Preencher' para responder." : "Aguardando resposta."}</div>}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  }

  const roleLabel = user.role === "admin" ? "Administrador" : user.role === "lider" ? `Líder · ${user.unidade}` : `Estagiário`;
  return (
    <div style={{ background: SF_BLACK, minHeight: 500, ...sf }}>
      <div style={{ background: SF_DARK_GRAY, borderBottom: `2px solid ${SF_YELLOW}`, padding: isMobile ? "10px 12px" : "12px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
        <SmartFitLogo size={isMobile ? 22 : 28} />
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ textAlign: "right" }}><div style={{ fontSize: isMobile ? 12 : 13, fontWeight: 700, color: "#fff" }}>{user.nome}</div><div style={{ fontSize: 10, color: SF_YELLOW }}>{roleLabel}</div></div>
          <button onClick={doLogout} style={{ ...ghostBtn(), fontSize: 11, padding: "4px 8px" }}>Sair</button>
        </div>
      </div>

      <div style={{ maxWidth: 680, margin: "0 auto", padding: isMobile ? "0.75rem" : "1rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: isMobile ? "flex-start" : "center", marginBottom: 14, gap: 10, flexWrap: "wrap" as any }}>
          <div>
            <div style={{ fontSize: 10, color: SF_YELLOW, fontWeight: 700, letterSpacing: 2 }}>PROGRAMA DE ESTÁGIO</div>
            <div style={{ fontSize: isMobile ? 15 : 18, fontWeight: 700, color: "#fff" }}>Acompanhamento de Estagiários</div>
          </div>
          {user.role === "admin" && (
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" as any }}>
              <button onClick={() => setShowPDF(true)} style={{ ...ghostBtn(), border: `1px solid ${SF_YELLOW}`, color: SF_YELLOW, fontSize: isMobile ? 11 : 13, padding: isMobile ? "6px 10px" : "6px 14px" }}>📄 {isMobile ? "PDF" : "Relatório PDF"}</button>
              <button onClick={() => setShowUnidades(true)} style={{ ...ghostBtn(), fontSize: isMobile ? 11 : 13, padding: isMobile ? "6px 10px" : "6px 14px" }}>🏢 {isMobile ? "Unidades" : "Gerenciar Unidades"}</button>
              <button onClick={() => setView("novoEst")} style={{ ...yellowBtn(), fontSize: isMobile ? 11 : 13, padding: isMobile ? "6px 12px" : "8px 18px" }}>+ {isMobile ? "Novo" : "Novo Estagiário"}</button>
            </div>
          )}
          {user.role === "lider" && (
            <button onClick={() => setShowPDF(true)} style={{ ...ghostBtn(), border: `1px solid ${SF_YELLOW}`, color: SF_YELLOW, fontSize: isMobile ? 11 : 13 }}>📄 {isMobile ? "PDF" : "Relatório PDF"}</button>
          )}
        </div>

        {canEdit && (
          <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" as any }}>
            {[["Unidade", "unidade", ["Todas", ...unidadesFiltro]], ["Período", "periodo", ["Todos", ...[...new Set(ests.map(e => e.periodo))]]], ["Status", "status", ["Todos", "Em andamento", "Atenção", "Concluído"]]].map(([label, key, opts]: any) => (
              <div key={key} style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <div style={{ fontSize: 9, color: "rgba(255,255,255,0.4)", fontWeight: 700, letterSpacing: 1 }}>{label.toUpperCase()}</div>
                <select value={(filtros as any)[key]} onChange={e => setFiltros({ ...filtros, [key]: e.target.value })} style={{ ...darkInp, width: "auto", padding: "5px 8px", fontSize: 12 }}>
                  {opts.map((o: string) => <option key={o}>{o}</option>)}
                </select>
              </div>
            ))}
          </div>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: isMobile ? 6 : 8, marginBottom: 14 }}>
          {[["TOTAL", filtrados.length, SF_YELLOW], ["ANDAMENTO", filtrados.filter(e => e.status === "Em andamento").length, "#60BFFF"], ["ATENÇÃO", filtrados.filter(e => e.status === "Atenção").length, "#FFD700"], ["CONCLUÍDOS", filtrados.filter(e => e.status === "Concluído").length, "#90EE90"]].map(([l, v, c]: any) => (
            <div key={l} style={{ background: SF_DARK_GRAY, border: `1px solid ${c}25`, borderRadius: 10, padding: isMobile ? "8px 4px" : "12px 8px", textAlign: "center" }}>
              <div style={{ fontSize: isMobile ? 18 : 22, fontWeight: 900, color: c }}>{v}</div>
              <div style={{ fontSize: isMobile ? 8 : 9, color: "rgba(255,255,255,0.4)", marginTop: 2, letterSpacing: 1 }}>{l}</div>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gap: 10 }}>
          {filtrados.map(e => {
            const av = colorFor(e.initials); const st = STATUS_CONFIG[e.status as keyof typeof STATUS_CONFIG];
            const tarefasOk = e.tarefas.filter((t: any) => t.feito).length;
            const trilhaCon = Object.values(e.trilhaStatus).flat().filter(Boolean).length;
            const trilhaTot = Object.values(e.trilhaStatus).flat().length;
            const pres = e.presencas.filter((p: any) => p.presente).length;
            const abPct = Math.min(100, Math.round((e.evolucao.abordagens.valor / e.evolucao.abordagens.meta) * 100));
            return (
              <div key={e.id} onClick={() => { setSel(e.id); setView("detail"); setAba("Tarefas"); }} style={{ background: SF_DARK_GRAY, border: "0.5px solid rgba(255,215,0,0.15)", borderRadius: 12, padding: isMobile ? "12px" : "14px 16px", cursor: "pointer" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  <div style={{ width: isMobile ? 38 : 44, height: isMobile ? 38 : 44, borderRadius: "50%", background: av.bg, border: `2px solid ${av.color}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: isMobile ? 13 : 15, fontWeight: 700, color: av.color, flexShrink: 0 }}>{e.initials}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 700, fontSize: isMobile ? 13 : 15, color: "#fff", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{e.nome}</div>
                    <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", marginTop: 1 }}>Smart Fit {e.unidade} · {e.periodo}</div>
                  </div>
                  <span style={{ fontSize: 10, padding: "3px 8px", borderRadius: 6, background: st.bg, color: st.color, fontWeight: 700, flexShrink: 0 }}>{isMobile ? e.status.split(" ")[0] : e.status}</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: isMobile ? 5 : 8 }}>
                  {[["Tarefas", `${tarefasOk}/${e.tarefas.length}`, e.tarefas.length ? Math.round((tarefasOk / e.tarefas.length) * 100) : 0, SF_YELLOW], ["Trilha", `${trilhaCon}/${trilhaTot}`, Math.round((trilhaCon / trilhaTot) * 100), "#60BFFF"], ["Presenças", `${pres}/${e.presencas.length}`, e.presencas.length ? Math.round((pres / e.presencas.length) * 100) : 0, "#90EE90"], ["Abordagens", `${e.evolucao.abordagens.valor}/${e.evolucao.abordagens.meta}`, abPct, "#FF80C0"]].map(([l, v, pct, c]: any) => (
                    <div key={l} style={{ background: "rgba(255,255,255,0.04)", borderRadius: 8, padding: isMobile ? "6px 4px" : "8px 10px", textAlign: "center", border: `0.5px solid ${c}25` }}>
                      <div style={{ fontSize: isMobile ? 11 : 13, fontWeight: 700, color: c }}>{v}</div>
                      <div style={{ fontSize: isMobile ? 8 : 10, color: "rgba(255,255,255,0.4)", marginTop: 1 }}>{l}</div>
                      <div style={{ height: 3, background: `${c}25`, borderRadius: 2, marginTop: 4 }}><div style={{ width: `${pct}%`, height: "100%", background: c, borderRadius: 2 }} /></div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}