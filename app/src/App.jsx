import { useState, useRef, useEffect } from "react";

const SF_YELLOW = "#FFD700";
const SF_BLACK = "#1A1A1A";
const SF_DARK_GRAY = "#2C2C2C";

const SUPA_URL = "https://lvdnsjzyofadmijvgcmr.supabase.co";
const SUPA_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx2ZG5zanp5b2ZhZG1panZnY21yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE2MTgyMjgsImV4cCI6MjA5NzE5NDIyOH0.OixJOtFqciYwKlk-SjdatQZeP-u_C3j0_DPd9kN1tHE";

const api = async (path, method = "GET", body = null) => {
  const res = await fetch(`${SUPA_URL}/rest/v1/${path}`, {
    method,
    headers: {
      "apikey": SUPA_KEY,
      "Authorization": `Bearer ${SUPA_KEY}`,
      "Content-Type": "application/json",
      "Prefer": method === "POST" ? "return=representation" : "return=minimal",
    },
    body: body ? JSON.stringify(body) : null
  });
  if (method === "GET" || method === "POST") {
    const text = await res.text();
    return text ? JSON.parse(text) : [];
  }
  return res;
};

const LOGO_SRC = "data:image/png;base64,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";

const SmartFitLogo = ({ size = 36 }) => (
  <img src={LOGO_SRC} alt="Smart Fit" style={{ height: size * 1.4, width: "auto", objectFit: "contain" }} />
);

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

const colorFor = (i) => [
  { bg: "#2a3a2a", color: SF_YELLOW }, { bg: "#1a2a3a", color: "#60BFFF" },
  { bg: "#2a1a2a", color: "#FF80C0" }, { bg: "#2a2a1a", color: SF_YELLOW },
][(i||"A").charCodeAt(0) % 4];

const Stars = ({ nota, onChange }) => (
  <span style={{ display: "inline-flex", gap: 2 }}>
    {[1,2,3,4,5].map(i => <span key={i} onClick={() => onChange && onChange(i)} style={{ fontSize: 18, cursor: onChange ? "pointer" : "default", color: i <= nota ? SF_YELLOW : "#555" }}>★</span>)}
  </span>
);

const RadialKPI = ({ label, valor, meta, color }) => {
  const pct = Math.min(1, valor / meta);
  const r = 34, cx = 42, cy = 42, sw = 7, circ = 2 * Math.PI * r;
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
      <svg width={84} height={84}>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth={sw} />
        <circle cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth={sw}
          strokeDasharray={`${pct * circ} ${circ}`} strokeLinecap="round" transform={`rotate(-90 ${cx} ${cy})`} />
        <text x={cx} y={cy - 5} textAnchor="middle" fontSize={14} fontWeight={700} fill="#fff">{valor}</text>
        <text x={cx} y={cy + 10} textAnchor="middle" fontSize={10} fill="rgba(255,255,255,0.5)">/{meta}</text>
      </svg>
      <span style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", textAlign: "center", maxWidth: 76 }}>{label}</span>
    </div>
  );
};

const sf = { color: "#fff", fontFamily: "Arial, sans-serif" };
const darkCard = (s = {}) => ({ background: SF_DARK_GRAY, border: "0.5px solid rgba(255,215,0,0.15)", borderRadius: 12, padding: "1rem 1.25rem", ...s });
const yellowBtn = (s = {}) => ({ background: SF_YELLOW, color: SF_BLACK, border: "none", borderRadius: 8, padding: "8px 18px", fontSize: 13, fontWeight: 700, cursor: "pointer", ...s });
const ghostBtn = (s = {}) => ({ background: "transparent", color: "#fff", border: "0.5px solid rgba(255,255,255,0.2)", borderRadius: 8, padding: "6px 14px", fontSize: 13, cursor: "pointer", ...s });
const darkInp = { width: "100%", fontSize: 13, padding: "9px 12px", borderRadius: 8, border: "0.5px solid rgba(255,215,0,0.3)", background: "rgba(255,255,255,0.06)", color: "#fff", boxSizing: "border-box" };

const Spinner = () => (
  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: 300 }}>
    <div style={{ width: 40, height: 40, border: `4px solid rgba(255,215,0,0.2)`, borderTop: `4px solid ${SF_YELLOW}`, borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
);

// ── PDF REPORT ────────────────────────────────────────────────────────
const PDFReport = ({ ests, onClose }) => {
  const printRef = useRef();
  const hoje = new Date().toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });
  const totalFbs = ests.flatMap(e => (e.feedbacks||[]).map(f => f.nota));
  const mediaGeral = totalFbs.length ? (totalFbs.reduce((a,b)=>a+b,0)/totalFbs.length).toFixed(1) : "—";
  const presTotal = ests.flatMap(e => e.presencas||[]);
  const presRate = presTotal.length ? Math.round((presTotal.filter(p=>p.presente).length/presTotal.length)*100) : 0;

  const handlePrint = () => {
    const content = printRef.current.innerHTML;
    const win = window.open("", "_blank");
    win.document.write(`<!DOCTYPE html><html><head><meta charset="utf-8">
    <title>Relatório Executivo — Smart Fit</title>
    <style>
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background: #fff; color: #1a1a1a; font-size: 11px; line-height: 1.5; }
      @media print { body { -webkit-print-color-adjust: exact; print-color-adjust: exact; } }
    </style></head><body>${content}</body></html>`);
    win.document.close();
    setTimeout(() => win.print(), 400);
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", zIndex: 1000, display: "flex", flexDirection: "column", alignItems: "center", overflow: "auto", padding: "20px 0" }}>
      <div style={{ position: "sticky", top: 0, zIndex: 10, background: SF_BLACK, borderBottom: `2px solid ${SF_YELLOW}`, width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 24px", marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <SmartFitLogo size={24} />
          <span style={{ color: "#fff", fontSize: 13, fontWeight: 500 }}>Pré-visualização do relatório</span>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={onClose} style={ghostBtn()}>✕ Fechar</button>
          <button onClick={handlePrint} style={{ ...yellowBtn(), display: "flex", alignItems: "center", gap: 8, fontSize: 14, padding: "10px 22px" }}>
            <span style={{ fontSize: 16 }}>⬇</span> Exportar PDF
          </button>
        </div>
      </div>

      <div ref={printRef} style={{ background: "#fff", width: 794, boxShadow: "0 8px 40px rgba(0,0,0,0.4)", borderRadius: 4, fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
        {/* CAPA */}
        <div style={{ background: "#1A1A1A", color: "#fff", padding: "60px 52px 40px", minHeight: 420, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <img src={LOGO_SRC} alt="Smart Fit" style={{ height: 40, marginBottom: 52, filter: "brightness(0) invert(1)" }} />
            <div style={{ fontSize: 10, letterSpacing: 3, color: SF_YELLOW, fontWeight: 700, marginBottom: 8, fontFamily: "Helvetica Neue, Arial, sans-serif" }}>RELATÓRIO EXECUTIVO</div>
            <div style={{ fontSize: 32, fontWeight: 900, color: SF_YELLOW, lineHeight: 1.1, marginBottom: 10, fontFamily: "Helvetica Neue, Arial, sans-serif" }}>Projeto Piloto<br/>de Estagiários</div>
            <div style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", marginBottom: 36 }}>Musculação · Rede Smart Fit</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", lineHeight: 2.2 }}>
              <div>Emitido em: <strong style={{ color: "rgba(255,255,255,0.8)" }}>{hoje}</strong></div>
              <div>Total de estagiários: <strong style={{ color: "rgba(255,255,255,0.8)" }}>{ests.length}</strong></div>
              <div>Cidades: <strong style={{ color: "rgba(255,255,255,0.8)" }}>{[...new Set(ests.map(e=>e.cidade))].join(", ")}</strong></div>
            </div>
          </div>
          <div style={{ borderTop: "1px solid rgba(255,215,0,0.2)", paddingTop: 16, fontSize: 10, color: "rgba(255,255,255,0.3)" }}>
            Documento confidencial · Uso interno · Grupo Smart Fit
          </div>
        </div>

        <div style={{ padding: "36px 44px" }}>
          {/* SUMÁRIO */}
          <div style={{ fontSize: 9, letterSpacing: 2.5, color: "#fff", fontWeight: 700, marginBottom: 10, background: "#1A1A1A", padding: "7px 14px", borderRadius: 4 }}>SUMÁRIO EXECUTIVO</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, marginBottom: 32 }}>
            {[["ESTAGIÁRIOS",ests.length,"#185FA5"],["MÉDIA FEEDBACKS",mediaGeral,"#F5A800"],["TAXA PRESENÇA",`${presRate}%`,"#3B6D11"],["FEEDBACKS",ests.reduce((a,e)=>a+(e.feedbacks||[]).length,0),"#534AB7"]].map(([l,v,c])=>(
              <div key={l} style={{ background: "#f8f8f8", borderRadius: 8, padding: "16px 10px", textAlign: "center", borderTop: `3px solid ${c}` }}>
                <div style={{ fontSize: 28, fontWeight: 900, color: c, lineHeight: 1 }}>{v}</div>
                <div style={{ fontSize: 8, color: "#999", marginTop: 5, letterSpacing: 1.2, textTransform: "uppercase" }}>{l}</div>
              </div>
            ))}
          </div>

          {/* POR ESTAGIÁRIO */}
          {ests.map(e => {
            const st = STATUS_CONFIG[e.status];
            const trilhaCon = (e.trilha_status||[]).filter(t=>t.concluido).length;
            const trilhaTot = TRILHA.reduce((a,m)=>a+m.temas.length,0);
            const presOk = (e.presencas||[]).filter(p=>p.presente).length;
            const tarefasOk = (e.tarefas||[]).filter(t=>t.feito).length;
            const ns = (e.feedbacks||[]).map(f=>f.nota);
            const mediaFb = ns.length ? (ns.reduce((a,b)=>a+b,0)/ns.length).toFixed(1) : "—";
            return (
              <div key={e.id} style={{ border: "1px solid #e8e8e8", borderRadius: 10, marginBottom: 28, overflow: "hidden", pageBreakInside: "avoid" }}>
                <div style={{ background: "#1A1A1A", padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 900, color: "#fff", letterSpacing: 0.3 }}>{e.nome}</div>
                    <div style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", marginTop: 3 }}>Smart Fit {e.unidade} · {e.cidade} · {e.periodo}</div>
                  </div>
                  <div style={{ background: st.bg, color: st.color, border: `1px solid ${st.border}`, padding: "4px 14px", borderRadius: 20, fontSize: 10, fontWeight: 700 }}>{e.status}</div>
                </div>
                <div style={{ padding: "18px 20px" }}>
                  {/* KPIs */}
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8, marginBottom: 16 }}>
                    {[["Tarefas",`${tarefasOk}/${(e.tarefas||[]).length}`,tarefasOk/Math.max((e.tarefas||[]).length,1),"#185FA5"],["Presenças",`${presOk}/${(e.presencas||[]).length}`,presOk/Math.max((e.presencas||[]).length,1),"#3B6D11"],["Trilha",`${trilhaCon}/${trilhaTot}`,trilhaCon/Math.max(trilhaTot,1),"#534AB7"],["Nota média",mediaFb,ns.length?parseFloat(mediaFb)/5:0,"#F5A800"]].map(([l,v,pct,c])=>(
                      <div key={l} style={{ background: "#f8f8f8", borderRadius: 6, padding: "10px 8px", textAlign: "center" }}>
                        <div style={{ fontSize: 18, fontWeight: 900, color: c }}>{v}</div>
                        <div style={{ fontSize: 8, color: "#aaa", textTransform: "uppercase", letterSpacing: 0.8, marginTop: 3 }}>{l}</div>
                        <div style={{ height: 3, background: "#eee", borderRadius: 2, marginTop: 6 }}><div style={{ width: `${Math.min(100,Math.round(pct*100))}%`, height: "100%", background: c, borderRadius: 2 }} /></div>
                      </div>
                    ))}
                  </div>

                  {/* DESEMPENHO */}
                  <div style={{ fontSize: 8, letterSpacing: 1.5, color: "#999", fontWeight: 700, textTransform: "uppercase", marginBottom: 8 }}>Desempenho no programa</div>
                  <div style={{ marginBottom: 16 }}>
                    {[["Abordagens proativas",e.evolucao?.abordagens_valor||0,e.evolucao?.abordagens_meta||60,"#185FA5"],["Correções de movimento",e.evolucao?.correcoes_valor||0,e.evolucao?.correcoes_meta||40,"#534AB7"],["Módulos concluídos",e.evolucao?.modulos_valor||0,e.evolucao?.modulos_meta||4,"#3B6D11"]].map(([l,val,meta,c])=>{
                      const p = Math.min(100,Math.round((val/meta)*100));
                      return (
                        <div key={l} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 7 }}>
                          <div style={{ fontSize: 10, color: "#444", width: 170 }}>{l}</div>
                          <div style={{ flex: 1, height: 6, background: "#eee", borderRadius: 3, overflow: "hidden" }}><div style={{ width: `${p}%`, height: "100%", background: c, borderRadius: 3 }} /></div>
                          <div style={{ fontSize: 10, fontWeight: 700, color: c, width: 65, textAlign: "right" }}>{val}/{meta} ({p}%)</div>
                        </div>
                      );
                    })}
                  </div>

                  {/* TAREFAS + PRESENÇAS */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                    <div>
                      <div style={{ fontSize: 8, letterSpacing: 1.5, color: "#999", fontWeight: 700, textTransform: "uppercase", marginBottom: 7 }}>Tarefas e atividades</div>
                      {(e.tarefas||[]).map(t=>(
                        <div key={t.id} style={{ display: "flex", gap: 6, fontSize: 10, padding: "5px 7px", background: t.feito?"#f0faf0":"#fafafa", borderRadius: 4, marginBottom: 3, border: `1px solid ${t.feito?"#C0DD97":"#eee"}` }}>
                          <span style={{ color: t.feito?"#3B6D11":"#ccc", fontWeight: 700 }}>{t.feito?"✓":"○"}</span>
                          <span style={{ color: t.feito?"#3B6D11":"#555", textDecoration: t.feito?"line-through":"none" }}>{t.texto}</span>
                        </div>
                      ))}
                    </div>
                    <div>
                      <div style={{ fontSize: 8, letterSpacing: 1.5, color: "#999", fontWeight: 700, textTransform: "uppercase", marginBottom: 7 }}>Presenças em eventos</div>
                      {(e.presencas||[]).map(p=>(
                        <div key={p.id} style={{ display: "flex", gap: 6, fontSize: 10, padding: "5px 7px", background: p.presente?"#f0faf0":"#fff5f5", borderRadius: 4, marginBottom: 3, border: `1px solid ${p.presente?"#C0DD97":"#fcc"}` }}>
                          <span style={{ color: p.presente?"#3B6D11":"#cc0000", fontWeight: 700 }}>{p.presente?"✓":"✗"}</span>
                          <div><div style={{ color: "#333" }}>{p.evento}</div><div style={{ color: "#aaa", fontSize: 9 }}>{p.data}{p.comentario?` — ${p.comentario}`:""}</div></div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* TRILHA */}
                  <div style={{ marginBottom: 16 }}>
                    <div style={{ fontSize: 8, letterSpacing: 1.5, color: "#999", fontWeight: 700, textTransform: "uppercase", marginBottom: 7 }}>Trilha pedagógica — Faculdade Phorte</div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                      {TRILHA.map((m,mi)=>{
                        const temas = (e.trilha_status||[]).filter(t=>t.modulo_index===mi);
                        const concl = temas.filter(t=>t.concluido).length;
                        const pct = Math.round((concl/m.temas.length)*100);
                        const cor = pct===100?"#3B6D11":pct>0?"#185FA5":"#aaa";
                        const bg = pct===100?"#f0faf0":pct>0?"#f0f6ff":"#fafafa";
                        return (
                          <div key={mi} style={{ background: bg, border: `1px solid ${pct===100?"#C0DD97":pct>0?"#B5D4F4":"#eee"}`, borderRadius: 6, padding: "9px 11px" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 5 }}>
                              <div style={{ width: 18, height: 18, borderRadius: "50%", background: cor, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 900, flexShrink: 0 }}>{mi+1}</div>
                              <div style={{ fontSize: 9, fontWeight: 700, color: "#333", flex: 1 }}>{m.modulo.split(":")[1]?.trim()}</div>
                              <div style={{ fontSize: 9, fontWeight: 700, color: cor }}>{concl}/{m.temas.length}</div>
                            </div>
                            {m.temas.map((tema,ti)=>{
                              const ok = (e.trilha_status||[]).find(t=>t.modulo_index===mi&&t.tema_index===ti)?.concluido;
                              return (
                                <div key={ti} style={{ display: "flex", gap: 5, fontSize: 9, color: ok?"#3B6D11":"#aaa", marginBottom: 2 }}>
                                  <span>{ok?"✓":"○"}</span><span>{tema.split("—")[0]?.trim()}</span>
                                </div>
                              );
                            })}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* FEEDBACKS */}
                  {(e.feedbacks||[]).length > 0 && (
                    <div style={{ marginBottom: 16 }}>
                      <div style={{ fontSize: 8, letterSpacing: 1.5, color: "#999", fontWeight: 700, textTransform: "uppercase", marginBottom: 7 }}>Feedbacks registrados</div>
                      {(e.feedbacks||[]).map(f=>(
                        <div key={f.id} style={{ background: "#f9f9f9", border: "1px solid #eee", borderRadius: 6, padding: "9px 11px", marginBottom: 6 }}>
                          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                            <span style={{ fontSize: 10, fontWeight: 700 }}>{f.autor} <span style={{ color: "#aaa", fontWeight: 400, fontSize: 9 }}>{f.cargo}</span></span>
                            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                              <span style={{ color: "#F5A800", fontSize: 11 }}>{"★".repeat(f.nota)}{"☆".repeat(5-f.nota)}</span>
                              <span style={{ fontSize: 9, color: "#bbb" }}>{f.data}</span>
                            </div>
                          </div>
                          <div style={{ fontSize: 10, color: "#555", lineHeight: 1.6 }}>{f.texto}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* SATISFAÇÃO */}
                  {e.satisfacao && (e.satisfacao.lider_respondido || e.satisfacao.estagiario_respondido) && (
                    <div>
                      <div style={{ fontSize: 8, letterSpacing: 1.5, color: "#999", fontWeight: 700, textTransform: "uppercase", marginBottom: 7 }}>Avaliações de satisfação</div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                        {e.satisfacao.lider_respondido && (
                          <div style={{ background: "#f9f9f9", border: "1px solid #eee", borderRadius: 6, padding: "11px" }}>
                            <div style={{ fontSize: 8, fontWeight: 700, color: "#185FA5", textTransform: "uppercase", letterSpacing: 1, marginBottom: 5 }}>Avaliação do líder</div>
                            <div style={{ fontSize: 22, fontWeight: 900, color: "#F5A800" }}>{e.satisfacao.lider_nota}/5</div>
                            <div style={{ fontSize: 9, color: "#555", marginTop: 5 }}><strong>+</strong> {e.satisfacao.lider_pontos}</div>
                            <div style={{ fontSize: 9, color: "#555", marginTop: 3 }}><strong>△</strong> {e.satisfacao.lider_melhoria}</div>
                          </div>
                        )}
                        {e.satisfacao.estagiario_respondido && (
                          <div style={{ background: "#f9f9f9", border: "1px solid #eee", borderRadius: 6, padding: "11px" }}>
                            <div style={{ fontSize: 8, fontWeight: 700, color: "#3B6D11", textTransform: "uppercase", letterSpacing: 1, marginBottom: 5 }}>Avaliação do estagiário</div>
                            <div style={{ fontSize: 22, fontWeight: 900, color: "#F5A800" }}>{e.satisfacao.estagiario_nota}/5</div>
                            <div style={{ fontSize: 9, color: "#555", marginTop: 5 }}><strong>+</strong> {e.satisfacao.estagiario_pontos}</div>
                            <div style={{ fontSize: 9, color: "#555", marginTop: 3 }}><strong>△</strong> {e.satisfacao.estagiario_melhoria}</div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* RODAPÉ */}
          <div style={{ borderTop: "1px solid #eee", paddingTop: 14, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <img src={LOGO_SRC} alt="Smart Fit" style={{ height: 18, filter: "brightness(0)" }} />
            <div style={{ fontSize: 9, color: "#bbb" }}>Relatório gerado em {hoje} · Grupo Smart Fit · Confidencial</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ── MAIN APP ──────────────────────────────────────────────────────────
export default function App() {
  const [user, setUser] = useState(null);
  const [loginInput, setLoginInput] = useState({ login: "", senha: "" });
  const [loginErr, setLoginErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [ests, setEsts] = useState([]);
  const [unidades, setUnidades] = useState([]);
  const [sel, setSel] = useState(null);
  const [aba, setAba] = useState("Tarefas");
  const [view, setView] = useState("home");
  const [showPDF, setShowPDF] = useState(false);
  const [moduloAberto, setModuloAberto] = useState(null);
  const [filtros, setFiltros] = useState({ cidade: "Todas", unidade: "Todas", periodo: "Todos", status: "Todos" });

  // forms
  const [formNovo, setFormNovo] = useState({ nome: "", unidade_id: "", cidade: "", periodo: "2025.1", status: "Em andamento" });
  const [formUnidade, setFormUnidade] = useState({ nome: "", cidade: "", lider_nome: "", lider_login: "", lider_senha: "" });
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

  const est = sel !== null ? ests.find(e => e.id === sel) : null;
  const canEdit = user?.role !== "estagiario";
  const isMyProfile = user?.role === "estagiario" && est?.id === user.est_id;
  const ABAS = user?.role === "estagiario" ? ["Tarefas","Evolução","Trilha","Presenças","Satisfação"] : ["Tarefas","Evolução","Trilha","Presenças","Feedbacks","Satisfação"];

  const myEsts = user?.role === "estagiario" ? ests.filter(e => e.id === user.est_id)
    : user?.role === "lider" ? ests.filter(e => e.unidade === user.unidade && e.cidade === user.cidade)
    : ests;

  const cidades = [...new Set(ests.map(e => e.cidade))];
  const unidadesFiltradas = [...new Set(ests.filter(e => filtros.cidade === "Todas" || e.cidade === filtros.cidade).map(e => e.unidade))];
  const filtrados = myEsts.filter(e =>
    (filtros.cidade === "Todas" || e.cidade === filtros.cidade) &&
    (filtros.unidade === "Todas" || e.unidade === filtros.unidade) &&
    (filtros.periodo === "Todos" || e.periodo === filtros.periodo) &&
    (filtros.status === "Todos" || e.status === filtros.status)
  );

  const loadData = async () => {
    setLoading(true);
    try {
      const [rows, tarefas, evolucoes, trilhas, presencas, feedbacks, satisfacoes, unis] = await Promise.all([
        api("estagiarios?select=*&order=nome"),
        api("tarefas?select=*"),
        api("evolucao?select=*"),
        api("trilha_status?select=*"),
        api("presencas?select=*&order=data"),
        api("feedbacks?select=*&order=data"),
        api("satisfacao?select=*"),
        api("unidades?select=*&order=nome"),
      ]);
      setUnidades(unis);
      setEsts(rows.map(e => ({
        ...e,
        tarefas: tarefas.filter(t => t.estagiario_id === e.id),
        evolucao: evolucoes.find(v => v.estagiario_id === e.id) || {},
        trilha_status: trilhas.filter(t => t.estagiario_id === e.id),
        presencas: presencas.filter(p => p.estagiario_id === e.id),
        feedbacks: feedbacks.filter(f => f.estagiario_id === e.id),
        satisfacao: satisfacoes.find(s => s.estagiario_id === e.id) || {},
      })));
    } catch(err) { console.error(err); }
    setLoading(false);
  };

  useEffect(() => { if (user) loadData(); }, [user]);

  const doLogin = async () => {
    setLoading(true);
    const rows = await api(`usuarios?login=eq.${loginInput.login}&senha=eq.${loginInput.senha}&select=*`);
    setLoading(false);
    if (rows.length) { setUser(rows[0]); setLoginErr(""); }
    else setLoginErr("Login ou senha incorretos.");
  };

  const doLogout = () => { setUser(null); setLoginInput({ login: "", senha: "" }); setSel(null); setView("home"); setEsts([]); };

  // mutações
  const toggleTarefa = async (t) => { await api(`tarefas?id=eq.${t.id}`, "PATCH", { feito: !t.feito }); loadData(); };
  const addTarefa = async () => {
    if (!novaTarefa.trim()) return;
    await api("tarefas", "POST", { estagiario_id: est.id, texto: novaTarefa.trim(), feito: false });
    setNovaTarefa(""); setShowTF(false); loadData();
  };
  const updEvolucao = async (k, delta) => {
    const meta = k==="abordagens"?60:k==="correcoes"?40:4;
    const novoVal = Math.min(meta, Math.max(0, (est.evolucao?.[`${k}_valor`]||0) + delta));
    await api(`evolucao?estagiario_id=eq.${est.id}`, "PATCH", { [`${k}_valor`]: novoVal });
    loadData();
  };
  const toggleTrilha = async (mi, ti) => {
    const existing = est.trilha_status.find(t => t.modulo_index===mi && t.tema_index===ti);
    if (existing) await api(`trilha_status?id=eq.${existing.id}`, "PATCH", { concluido: !existing.concluido });
    else await api("trilha_status", "POST", { estagiario_id: est.id, modulo_index: mi, tema_index: ti, concluido: true });
    const allTrilha = await api(`trilha_status?estagiario_id=eq.${est.id}&concluido=eq.true`);
    const modConcl = TRILHA.filter((m,idx) => allTrilha.filter(t=>t.modulo_index===idx).length === m.temas.length).length;
    await api(`evolucao?estagiario_id=eq.${est.id}`, "PATCH", { modulos_valor: modConcl });
    loadData();
  };
  const addPresenca = async () => {
    if (!novaP.evento||!novaP.data) return;
    await api("presencas", "POST", { estagiario_id: est.id, ...novaP });
    setNovaP({ evento:"",data:"",presente:true,comentario:"" }); setShowPF(false); loadData();
  };
  const addFeedback = async () => {
    if (!formFb.autor||!formFb.texto) return;
    await api("feedbacks", "POST", { estagiario_id: est.id, ...formFb, data: new Date().toLocaleDateString("pt-BR") });
    setFormFb({ autor:"",cargo:"Líder da Unidade",nota:5,texto:"" }); setShowFbForm(false); loadData();
  };
  const submitSatisfacao = async (tipo, form) => {
    const body = { [`${tipo}_respondido`]: true, [`${tipo}_nota`]: form.nota, [`${tipo}_pontos`]: form.pontos, [`${tipo}_melhoria`]: form.melhoria };
    if (est.satisfacao?.id) await api(`satisfacao?id=eq.${est.satisfacao.id}`, "PATCH", body);
    else await api("satisfacao", "POST", { estagiario_id: est.id, ...body });
    tipo==="lider" ? setShowLiderForm(false) : setShowEstForm(false);
    loadData();
  };

  const addUnidadeELider = async () => {
    if (!formUnidade.nome||!formUnidade.cidade||!formUnidade.lider_nome||!formUnidade.lider_login||!formUnidade.lider_senha) return;
    // cria líder
    const [novoLider] = await api("usuarios", "POST", { nome: formUnidade.lider_nome, login: formUnidade.lider_login, senha: formUnidade.lider_senha, role: "lider", cidade: formUnidade.cidade, unidade: formUnidade.nome });
    // cria unidade vinculada ao líder
    await api("unidades", "POST", { nome: formUnidade.nome, cidade: formUnidade.cidade, lider_id: novoLider?.id });
    setFormUnidade({ nome:"",cidade:"",lider_nome:"",lider_login:"",lider_senha:"" });
    setView("home"); loadData();
  };

  const addEstagiario = async () => {
    if (!formNovo.nome.trim()||!formNovo.unidade_id) return;
    const unid = unidades.find(u => u.id === formNovo.unidade_id);
    const initials = formNovo.nome.split(" ").slice(0,2).map(w=>w[0]).join("").toUpperCase();
    const [novoEst] = await api("estagiarios", "POST", { nome: formNovo.nome, unidade: unid.nome, cidade: unid.cidade, periodo: formNovo.periodo, status: formNovo.status, initials });
    if (novoEst) {
      await api("evolucao", "POST", { estagiario_id: novoEst.id, abordagens_valor:0,abordagens_meta:60,correcoes_valor:0,correcoes_meta:40,modulos_valor:0,modulos_meta:4 });
      // cria login do estagiário
      const loginGerado = formNovo.nome.toLowerCase().replace(/\s+/g,".");
      await api("usuarios", "POST", { nome: formNovo.nome, login: loginGerado, senha: "123", role: "estagiario", cidade: unid.cidade, unidade: unid.nome, periodo: formNovo.periodo, est_id: novoEst.id });
    }
    setFormNovo({ nome:"",unidade_id:"",cidade:"",periodo:"2025.1",status:"Em andamento" });
    setView("home"); loadData();
  };

  // ── LOGIN ──
  if (!user) return (
    <div style={{ minHeight: 500, background: SF_BLACK, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2rem 1rem", fontFamily: "Arial, sans-serif" }}>
      <div style={{ marginBottom: 32 }}><SmartFitLogo size={40} /></div>
      <div style={{ width: "100%", maxWidth: 360, background: SF_DARK_GRAY, borderRadius: 16, padding: "2rem", border: "1px solid rgba(255,215,0,0.2)" }}>
        <div style={{ fontSize: 11, color: SF_YELLOW, fontWeight: 700, letterSpacing: 2, marginBottom: 4 }}>PROGRAMA DE ESTÁGIO</div>
        <div style={{ fontSize: 20, fontWeight: 700, color: "#fff", marginBottom: 24 }}>Acesse sua conta</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", marginBottom: 4, fontWeight: 700, letterSpacing: 1 }}>LOGIN</div>
            <input value={loginInput.login} onChange={e=>setLoginInput({...loginInput,login:e.target.value})} onKeyDown={e=>e.key==="Enter"&&doLogin()} placeholder="seu.login" style={darkInp} />
          </div>
          <div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", marginBottom: 4, fontWeight: 700, letterSpacing: 1 }}>SENHA</div>
            <input type="password" value={loginInput.senha} onChange={e=>setLoginInput({...loginInput,senha:e.target.value})} onKeyDown={e=>e.key==="Enter"&&doLogin()} placeholder="••••••" style={darkInp} />
          </div>
          {loginErr && <div style={{ fontSize: 12, color: SF_YELLOW, background: "rgba(255,215,0,0.08)", padding: "8px 10px", borderRadius: 6 }}>{loginErr}</div>}
          <button onClick={doLogin} disabled={loading} style={{ ...yellowBtn(), padding: "10px", fontSize: 14, marginTop: 4, opacity: loading?0.7:1 }}>{loading ? "Entrando..." : "Entrar"}</button>
        </div>
      </div>
    </div>
  );

  if (showPDF) return <PDFReport ests={myEsts} onClose={() => setShowPDF(false)} />;
  if (loading && ests.length === 0) return <div style={{ background: SF_BLACK, minHeight: 500, ...sf }}><div style={{ background: SF_DARK_GRAY, borderBottom: `2px solid ${SF_YELLOW}`, padding: "12px 16px" }}><SmartFitLogo size={28} /></div><Spinner /></div>;

  // ── CADASTRAR UNIDADE + LÍDER ──
  if (view === "novaUnidade") return (
    <div style={{ background: SF_BLACK, minHeight: 500, ...sf, padding: "1rem" }}>
      <div style={{ maxWidth: 500, margin: "0 auto" }}>
        <button onClick={() => setView("home")} style={{ ...ghostBtn(), marginBottom: 20 }}>← Voltar</button>
        <div style={darkCard()}>
          <div style={{ fontWeight: 700, fontSize: 16, color: SF_YELLOW, marginBottom: 4 }}>Nova Unidade + Líder</div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginBottom: 20 }}>Cadastre a unidade e o líder responsável em uma única etapa</div>
          <div style={{ fontSize: 11, color: SF_YELLOW, fontWeight: 700, letterSpacing: 1, marginBottom: 10 }}>DADOS DA UNIDADE</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
            {[["Nome da unidade","nome","Ex: Moema"],["Cidade","cidade","Ex: São Paulo"]].map(([label,key,ph])=>(
              <div key={key}><div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginBottom: 4, fontWeight: 700, letterSpacing: 1 }}>{label.toUpperCase()}</div>
                <input value={formUnidade[key]} onChange={e=>setFormUnidade({...formUnidade,[key]:e.target.value})} placeholder={ph} style={darkInp} /></div>
            ))}
          </div>
          <div style={{ fontSize: 11, color: SF_YELLOW, fontWeight: 700, letterSpacing: 1, marginBottom: 10 }}>DADOS DO LÍDER DA UNIDADE</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
            {[["Nome completo","lider_nome","Ex: João Silva"],["Login","lider_login","Ex: joao.silva"],["Senha","lider_senha","Mínimo 6 caracteres"]].map(([label,key,ph])=>(
              <div key={key}><div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginBottom: 4, fontWeight: 700, letterSpacing: 1 }}>{label.toUpperCase()}</div>
                <input type={key==="lider_senha"?"password":"text"} value={formUnidade[key]} onChange={e=>setFormUnidade({...formUnidade,[key]:e.target.value})} placeholder={ph} style={darkInp} /></div>
            ))}
          </div>
          <button onClick={addUnidadeELider} style={{ ...yellowBtn(), padding: "10px", fontSize: 14, width: "100%" }}>Cadastrar unidade e líder</button>
        </div>
      </div>
    </div>
  );

  // ── CADASTRAR ESTAGIÁRIO ──
  if (view === "novoEst") return (
    <div style={{ background: SF_BLACK, minHeight: 500, ...sf, padding: "1rem" }}>
      <div style={{ maxWidth: 480, margin: "0 auto" }}>
        <button onClick={() => setView("home")} style={{ ...ghostBtn(), marginBottom: 20 }}>← Voltar</button>
        <div style={darkCard()}>
          <div style={{ fontWeight: 700, fontSize: 16, color: SF_YELLOW, marginBottom: 4 }}>Novo estagiário</div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginBottom: 20 }}>O login será criado automaticamente no formato nome.sobrenome / senha: 123</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div><div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginBottom: 4, fontWeight: 700, letterSpacing: 1 }}>NOME COMPLETO</div>
              <input value={formNovo.nome} onChange={e=>setFormNovo({...formNovo,nome:e.target.value})} placeholder="Ex: João da Silva" style={darkInp} /></div>
            <div><div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginBottom: 4, fontWeight: 700, letterSpacing: 1 }}>UNIDADE SMART FIT</div>
              <select value={formNovo.unidade_id} onChange={e=>setFormNovo({...formNovo,unidade_id:e.target.value})} style={darkInp}>
                <option value="">Selecione uma unidade...</option>
                {unidades.map(u=><option key={u.id} value={u.id}>{u.nome} — {u.cidade}</option>)}
              </select></div>
            {formNovo.unidade_id && (() => { const u = unidades.find(x=>x.id===formNovo.unidade_id); return u ? (
              <div style={{ padding: "10px 12px", background: "rgba(255,215,0,0.06)", borderRadius: 8, border: "0.5px solid rgba(255,215,0,0.2)", fontSize: 12, color: "rgba(255,255,255,0.6)" }}>
                📍 <strong style={{ color: SF_YELLOW }}>{u.nome}</strong> · {u.cidade}
              </div>
            ) : null; })()}
            <div><div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginBottom: 4, fontWeight: 700, letterSpacing: 1 }}>PERÍODO</div>
              <input value={formNovo.periodo} onChange={e=>setFormNovo({...formNovo,periodo:e.target.value})} placeholder="Ex: 2025.1" style={darkInp} /></div>
            <div><div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginBottom: 4, fontWeight: 700, letterSpacing: 1 }}>STATUS</div>
              <select value={formNovo.status} onChange={e=>setFormNovo({...formNovo,status:e.target.value})} style={darkInp}>
                <option>Em andamento</option><option>Atenção</option><option>Concluído</option>
              </select></div>
            <button onClick={addEstagiario} style={{ ...yellowBtn(), padding: "10px", fontSize: 14, marginTop: 4 }}>Cadastrar estagiário</button>
          </div>
        </div>
      </div>
    </div>
  );

  // ── DETAIL ──
  if (view === "detail" && est) {
    const av = colorFor(est.initials||"A");
    const st = STATUS_CONFIG[est.status];
    const getTrilha = (mi,ti) => (est.trilha_status||[]).find(t=>t.modulo_index===mi&&t.tema_index===ti)?.concluido||false;
    return (
      <div style={{ background: SF_BLACK, minHeight: 500, ...sf, padding: "1rem" }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <button onClick={()=>{ setView("home"); setAba("Tarefas"); setSel(null); }} style={ghostBtn()}>← Voltar</button>
            <div style={{ width:40,height:40,borderRadius:"50%",background:av.bg,border:`2px solid ${av.color}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:700,color:av.color }}>{est.initials}</div>
            <div><div style={{ fontWeight:700,fontSize:15 }}>{est.nome}</div><div style={{ fontSize:11,color:"rgba(255,255,255,0.5)" }}>Smart Fit {est.unidade} · {est.cidade} · {est.periodo}</div></div>
            <div style={{ marginLeft:"auto",background:st.bg,color:st.color,border:`0.5px solid ${st.border}`,borderRadius:6,fontSize:11,padding:"3px 10px",fontWeight:700 }}>{est.status}</div>
          </div>
          <div style={{ display:"flex",gap:6,flexWrap:"wrap",marginBottom:16 }}>
            {ABAS.map(a=><button key={a} onClick={()=>setAba(a)} style={{ fontSize:12,padding:"5px 14px",borderRadius:20,border:`1px solid ${aba===a?SF_YELLOW:"rgba(255,255,255,0.15)"}`,cursor:"pointer",background:aba===a?SF_YELLOW:"transparent",color:aba===a?SF_BLACK:"#fff",fontWeight:aba===a?700:400 }}>{a}</button>)}
          </div>

          {aba==="Tarefas"&&(
            <div style={darkCard()}>
              <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12 }}>
                <span style={{ fontSize:14,fontWeight:700,color:SF_YELLOW }}>Tarefas e atividades</span>
                {(canEdit||isMyProfile)&&<button onClick={()=>setShowTF(!showTF)} style={ghostBtn()}>+ Nova</button>}
              </div>
              {showTF&&<div style={{ display:"flex",gap:8,marginBottom:12 }}><input value={novaTarefa} onChange={e=>setNovaTarefa(e.target.value)} placeholder="Descreva a tarefa..." style={{ ...darkInp,flex:1 }} /><button onClick={addTarefa} style={yellowBtn()}>OK</button></div>}
              <div style={{ display:"flex",flexDirection:"column",gap:8 }}>
                {(est.tarefas||[]).map(t=>(
                  <div key={t.id} onClick={()=>(canEdit||isMyProfile)&&toggleTarefa(t)} style={{ display:"flex",alignItems:"center",gap:10,cursor:(canEdit||isMyProfile)?"pointer":"default",padding:"10px 12px",borderRadius:8,background:t.feito?"rgba(255,215,0,0.08)":"rgba(255,255,255,0.04)",border:`0.5px solid ${t.feito?"rgba(255,215,0,0.3)":"rgba(255,255,255,0.08)"}` }}>
                    <div style={{ width:18,height:18,borderRadius:4,border:`2px solid ${t.feito?SF_YELLOW:"rgba(255,255,255,0.3)"}`,background:t.feito?SF_YELLOW:"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>{t.feito&&<span style={{ color:SF_BLACK,fontSize:11,fontWeight:900 }}>✓</span>}</div>
                    <span style={{ fontSize:13,color:t.feito?SF_YELLOW:"rgba(255,255,255,0.8)",textDecoration:t.feito?"line-through":"none" }}>{t.texto}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {aba==="Evolução"&&(
            <div style={darkCard()}>
              <div style={{ fontWeight:700,fontSize:14,color:SF_YELLOW,marginBottom:20 }}>Desempenho no programa</div>
              <div style={{ display:"flex",justifyContent:"space-around",flexWrap:"wrap",gap:16,marginBottom:24 }}>
                <RadialKPI label="Abordagens proativas" valor={est.evolucao?.abordagens_valor||0} meta={est.evolucao?.abordagens_meta||60} color={SF_YELLOW} />
                <RadialKPI label="Correções de movimento" valor={est.evolucao?.correcoes_valor||0} meta={est.evolucao?.correcoes_meta||40} color="#60BFFF" />
                <RadialKPI label="Módulos concluídos" valor={est.evolucao?.modulos_valor||0} meta={est.evolucao?.modulos_meta||4} color="#90EE90" />
              </div>
              {canEdit&&<div style={{ borderTop:"0.5px solid rgba(255,215,0,0.15)",paddingTop:16 }}>
                <div style={{ fontSize:12,fontWeight:700,color:"rgba(255,255,255,0.5)",letterSpacing:1,marginBottom:10 }}>ATUALIZAR REGISTROS</div>
                {[["abordagens","Abordagens proativas"],["correcoes","Correções de movimento"],["modulos","Módulos concluídos"]].map(([k,label])=>(
                  <div key={k} style={{ display:"flex",alignItems:"center",gap:10,marginBottom:10 }}>
                    <span style={{ fontSize:12,color:"rgba(255,255,255,0.6)",flex:1 }}>{label}</span>
                    <button onClick={()=>updEvolucao(k,-1)} style={{ ...ghostBtn(),padding:"4px 12px",fontSize:16 }}>−</button>
                    <span style={{ minWidth:28,textAlign:"center",fontSize:14,fontWeight:700,color:SF_YELLOW }}>{est.evolucao?.[`${k}_valor`]||0}</span>
                    <button onClick={()=>updEvolucao(k,1)} style={{ ...ghostBtn(),padding:"4px 12px",fontSize:16 }}>+</button>
                  </div>
                ))}
              </div>}
            </div>
          )}

          {aba==="Trilha"&&(
            <div style={darkCard()}>
              <div style={{ fontWeight:700,fontSize:14,color:SF_YELLOW,marginBottom:4 }}>Trilha pedagógica</div>
              <div style={{ fontSize:11,color:"rgba(255,255,255,0.4)",marginBottom:16 }}>Chancelada pela Faculdade Phorte</div>
              <div style={{ display:"flex",flexDirection:"column",gap:8 }}>
                {TRILHA.map((m,mi)=>{
                  const concl = m.temas.filter((_,ti)=>getTrilha(mi,ti)).length;
                  const aberto = moduloAberto===mi;
                  const pct = Math.round((concl/m.temas.length)*100);
                  const cor = pct===100?"#90EE90":pct>0?SF_YELLOW:"rgba(255,255,255,0.3)";
                  return (
                    <div key={mi} style={{ border:`0.5px solid ${pct>0?"rgba(255,215,0,0.3)":"rgba(255,255,255,0.08)"}`,borderRadius:10,overflow:"hidden" }}>
                      <div onClick={()=>setModuloAberto(aberto?null:mi)} style={{ display:"flex",alignItems:"center",gap:10,padding:"12px 14px",cursor:"pointer",background:"rgba(255,255,255,0.03)" }}>
                        <div style={{ width:30,height:30,borderRadius:"50%",border:`2px solid ${cor}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,color:cor,flexShrink:0 }}>{mi+1}</div>
                        <div style={{ flex:1 }}><div style={{ fontSize:13,fontWeight:700,color:"#fff" }}>{m.modulo}</div><div style={{ fontSize:11,color:"rgba(255,255,255,0.4)",marginTop:1 }}>{m.sub}</div></div>
                        <span style={{ fontSize:11,color:cor,fontWeight:700,marginRight:6 }}>{concl}/{m.temas.length}</span>
                        <span style={{ color:"rgba(255,255,255,0.4)",fontSize:12 }}>{aberto?"▲":"▼"}</span>
                      </div>
                      {aberto&&<div style={{ padding:"10px 14px 12px",display:"flex",flexDirection:"column",gap:8,background:"rgba(0,0,0,0.2)" }}>
                        {m.temas.map((tema,ti)=>{
                          const ok = getTrilha(mi,ti);
                          return (
                            <div key={ti} onClick={()=>{ if(!canEdit&&!isMyProfile)return; toggleTrilha(mi,ti); }} style={{ display:"flex",alignItems:"flex-start",gap:10,cursor:(canEdit||isMyProfile)?"pointer":"default",padding:"8px 10px",borderRadius:8,background:ok?"rgba(255,215,0,0.07)":"rgba(255,255,255,0.03)",border:`0.5px solid ${ok?"rgba(255,215,0,0.2)":"rgba(255,255,255,0.06)"}` }}>
                              <div style={{ width:16,height:16,borderRadius:3,border:`2px solid ${ok?SF_YELLOW:"rgba(255,255,255,0.2)"}`,background:ok?SF_YELLOW:"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:1 }}>{ok&&<span style={{ color:SF_BLACK,fontSize:10,fontWeight:900 }}>✓</span>}</div>
                              <span style={{ fontSize:12,color:ok?SF_YELLOW:"rgba(255,255,255,0.7)",lineHeight:1.5 }}>{tema}</span>
                            </div>
                          );
                        })}
                      </div>}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {aba==="Presenças"&&(
            <div style={darkCard()}>
              <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14 }}>
                <span style={{ fontSize:14,fontWeight:700,color:SF_YELLOW }}>Presenças em eventos e reuniões</span>
                {canEdit&&<button onClick={()=>setShowPF(!showPF)} style={ghostBtn()}>+ Registrar</button>}
              </div>
              {showPF&&<div style={{ display:"flex",flexDirection:"column",gap:8,marginBottom:14,padding:"12px",background:"rgba(255,255,255,0.04)",borderRadius:8 }}>
                <input value={novaP.evento} onChange={e=>setNovaP({...novaP,evento:e.target.value})} placeholder="Nome do evento" style={darkInp} />
                <input value={novaP.data} onChange={e=>setNovaP({...novaP,data:e.target.value})} placeholder="Data (ex: 30/05/2025)" style={darkInp} />
                <div style={{ display:"flex",gap:8 }}>
                  <button onClick={()=>setNovaP({...novaP,presente:true})} style={{ flex:1,...(novaP.presente?yellowBtn():ghostBtn()) }}>Presente</button>
                  <button onClick={()=>setNovaP({...novaP,presente:false})} style={{ flex:1,...(!novaP.presente?yellowBtn():ghostBtn()) }}>Ausente</button>
                </div>
                <textarea value={novaP.comentario} onChange={e=>setNovaP({...novaP,comentario:e.target.value})} placeholder="Comentário..." rows={2} style={{ ...darkInp,resize:"vertical" }} />
                <button onClick={addPresenca} style={yellowBtn()}>Salvar</button>
              </div>}
              <div style={{ display:"flex",flexDirection:"column",gap:8 }}>
                {(est.presencas||[]).map(p=>(
                  <div key={p.id} style={{ padding:"10px 12px",borderRadius:8,background:p.presente?"rgba(144,238,144,0.08)":"rgba(255,100,100,0.08)",border:`0.5px solid ${p.presente?"rgba(144,238,144,0.3)":"rgba(255,100,100,0.3)"}` }}>
                    <div style={{ display:"flex",alignItems:"center",gap:8 }}>
                      <span style={{ fontSize:14,color:p.presente?"#90EE90":"#FF8080" }}>{p.presente?"✓":"✗"}</span>
                      <div style={{ flex:1 }}><div style={{ fontSize:13,color:"#fff" }}>{p.evento}</div><div style={{ fontSize:11,color:"rgba(255,255,255,0.4)" }}>{p.data}</div></div>
                      <span style={{ fontSize:11,fontWeight:700,color:p.presente?"#90EE90":"#FF8080" }}>{p.presente?"Presente":"Ausente"}</span>
                    </div>
                    {p.comentario&&<div style={{ fontSize:12,color:"rgba(255,255,255,0.5)",marginTop:6,paddingTop:6,borderTop:"0.5px solid rgba(255,255,255,0.08)" }}>💬 {p.comentario}</div>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {aba==="Feedbacks"&&canEdit&&(
            <div style={darkCard()}>
              <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14 }}>
                <span style={{ fontSize:14,fontWeight:700,color:SF_YELLOW }}>Feedbacks registrados</span>
                <button onClick={()=>setShowFbForm(!showFbForm)} style={ghostBtn()}>+ Novo</button>
              </div>
              {showFbForm&&<div style={{ display:"flex",flexDirection:"column",gap:8,marginBottom:14,padding:"12px",background:"rgba(255,255,255,0.04)",borderRadius:8 }}>
                <input value={formFb.autor} onChange={e=>setFormFb({...formFb,autor:e.target.value})} placeholder="Seu nome" style={darkInp} />
                <select value={formFb.cargo} onChange={e=>setFormFb({...formFb,cargo:e.target.value})} style={darkInp}><option>Líder da Unidade</option><option>Parceiro — Prof. Musculação</option><option>Parceiro — Recepcionista</option></select>
                <div style={{ display:"flex",alignItems:"center",gap:8 }}><span style={{ fontSize:12,color:"rgba(255,255,255,0.5)" }}>Nota:</span><Stars nota={formFb.nota} onChange={n=>setFormFb({...formFb,nota:n})} /></div>
                <textarea value={formFb.texto} onChange={e=>setFormFb({...formFb,texto:e.target.value})} placeholder="Escreva o feedback..." rows={3} style={{ ...darkInp,resize:"vertical" }} />
                <button onClick={addFeedback} style={yellowBtn()}>Salvar feedback</button>
              </div>}
              <div style={{ display:"flex",flexDirection:"column",gap:10 }}>
                {(est.feedbacks||[]).map(f=>(
                  <div key={f.id} style={{ padding:"12px",borderRadius:8,background:"rgba(255,255,255,0.04)",border:"0.5px solid rgba(255,215,0,0.1)" }}>
                    <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8 }}>
                      <div><span style={{ fontSize:13,fontWeight:700,color:"#fff" }}>{f.autor}</span><span style={{ fontSize:11,color:SF_YELLOW,marginLeft:8,background:"rgba(255,215,0,0.1)",borderRadius:4,padding:"1px 6px" }}>{f.cargo}</span></div>
                      <div style={{ display:"flex",alignItems:"center",gap:6 }}><Stars nota={f.nota} /><span style={{ fontSize:11,color:"rgba(255,255,255,0.4)" }}>{f.data}</span></div>
                    </div>
                    <p style={{ fontSize:13,margin:0,color:"rgba(255,255,255,0.6)",lineHeight:1.6 }}>{f.texto}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {aba==="Satisfação"&&(
            <div style={{ display:"flex",flexDirection:"column",gap:14 }}>
              {[
                { key:"lider",titulo:"Avaliação do líder",sub:"Como o líder avalia o estagiário",showS:showLiderForm,setShowS:setShowLiderForm,form:formLider,setForm:setFormLider,canAnswer:canEdit,pL:"Pontos positivos",pM:"Pontos de melhoria",respondido:est.satisfacao?.lider_respondido,nota:est.satisfacao?.lider_nota,pontos:est.satisfacao?.lider_pontos,melhoria:est.satisfacao?.lider_melhoria },
                { key:"estagiario",titulo:"Avaliação do estagiário",sub:"O que o estagiário achou do programa",showS:showEstForm,setShowS:setShowEstForm,form:formEst,setForm:setFormEst,canAnswer:isMyProfile||canEdit,pL:"O que mais gostou?",pM:"Sugestões",respondido:est.satisfacao?.estagiario_respondido,nota:est.satisfacao?.estagiario_nota,pontos:est.satisfacao?.estagiario_pontos,melhoria:est.satisfacao?.estagiario_melhoria },
              ].map(({ key,titulo,sub,showS,setShowS,form,setForm,canAnswer,pL,pM,respondido,nota,pontos,melhoria })=>(
                <div key={key} style={darkCard()}>
                  <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14 }}>
                    <div><div style={{ fontWeight:700,fontSize:14,color:SF_YELLOW }}>{titulo}</div><div style={{ fontSize:11,color:"rgba(255,255,255,0.4)",marginTop:2 }}>{sub}</div></div>
                    {!respondido&&canAnswer&&<button onClick={()=>setShowS(!showS)} style={ghostBtn()}>Preencher</button>}
                  </div>
                  {respondido?(
                    <div>
                      <div style={{ display:"flex",alignItems:"center",gap:14,padding:"14px",borderRadius:10,background:"rgba(255,215,0,0.06)",border:"0.5px solid rgba(255,215,0,0.2)",marginBottom:12 }}>
                        <div style={{ fontSize:40,fontWeight:900,color:SF_YELLOW,lineHeight:1 }}>{nota}</div>
                        <div><Stars nota={nota} /><div style={{ fontSize:11,color:"rgba(255,255,255,0.4)",marginTop:2 }}>Nota {nota} de 5</div></div>
                      </div>
                      <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:10 }}>
                        <div style={{ padding:"10px 12px",background:"rgba(144,238,144,0.08)",borderRadius:8,border:"0.5px solid rgba(144,238,144,0.2)" }}>
                          <div style={{ fontSize:10,color:"#90EE90",fontWeight:700,letterSpacing:1,marginBottom:6 }}>PONTOS POSITIVOS</div>
                          <div style={{ fontSize:12,color:"rgba(255,255,255,0.7)",lineHeight:1.5 }}>{pontos}</div>
                        </div>
                        <div style={{ padding:"10px 12px",background:"rgba(255,215,0,0.05)",borderRadius:8,border:"0.5px solid rgba(255,215,0,0.15)" }}>
                          <div style={{ fontSize:10,color:SF_YELLOW,fontWeight:700,letterSpacing:1,marginBottom:6 }}>PONTOS DE MELHORIA</div>
                          <div style={{ fontSize:12,color:"rgba(255,255,255,0.7)",lineHeight:1.5 }}>{melhoria}</div>
                        </div>
                      </div>
                    </div>
                  ):showS&&canAnswer?(
                    <div style={{ display:"flex",flexDirection:"column",gap:8,padding:"12px",background:"rgba(255,255,255,0.04)",borderRadius:8 }}>
                      <div style={{ display:"flex",alignItems:"center",gap:8 }}><span style={{ fontSize:12,color:"rgba(255,255,255,0.5)" }}>Nota:</span><Stars nota={form.nota} onChange={n=>setForm({...form,nota:n})} /></div>
                      <textarea value={form.pontos} onChange={e=>setForm({...form,pontos:e.target.value})} placeholder={pL} rows={2} style={{ ...darkInp,resize:"vertical" }} />
                      <textarea value={form.melhoria} onChange={e=>setForm({...form,melhoria:e.target.value})} placeholder={pM} rows={2} style={{ ...darkInp,resize:"vertical" }} />
                      <button onClick={()=>submitSatisfacao(key,form)} style={yellowBtn()}>Enviar avaliação</button>
                    </div>
                  ):<div style={{ textAlign:"center",padding:"20px",color:"rgba(255,255,255,0.3)",fontSize:13 }}>{canAnswer?"Clique em 'Preencher' para responder.":"Aguardando resposta."}</div>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // ── HOME ──
  const roleLabel = user.role==="admin"?"Administrador":user.role==="lider"?`Líder · ${user.unidade}`:`Estagiário · ${user.unidade}`;
  return (
    <div style={{ background: SF_BLACK, minHeight: 500, ...sf }}>
      <div style={{ background: SF_DARK_GRAY, borderBottom: `2px solid ${SF_YELLOW}`, padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <SmartFitLogo size={28} />
        <div style={{ display:"flex",alignItems:"center",gap:10 }}>
          <div style={{ textAlign:"right" }}><div style={{ fontSize:13,fontWeight:700,color:"#fff" }}>{user.nome}</div><div style={{ fontSize:10,color:SF_YELLOW }}>{roleLabel}</div></div>
          <button onClick={doLogout} style={{ ...ghostBtn(),fontSize:11,padding:"4px 10px" }}>Sair</button>
        </div>
      </div>
      <div style={{ maxWidth: 680, margin: "0 auto", padding: "1rem" }}>
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16 }}>
          <div>
            <div style={{ fontSize:11,color:SF_YELLOW,fontWeight:700,letterSpacing:2 }}>PROGRAMA DE ESTÁGIO</div>
            <div style={{ fontSize:18,fontWeight:700,color:"#fff" }}>Acompanhamento de Estagiários</div>
          </div>
          {canEdit&&<div style={{ display:"flex",gap:8,flexWrap:"wrap",justifyContent:"flex-end" }}>
            <button onClick={()=>setShowPDF(true)} style={{ ...ghostBtn(),display:"flex",alignItems:"center",gap:6,border:`1px solid ${SF_YELLOW}`,color:SF_YELLOW }}>📄 PDF</button>
            {user.role==="admin"&&<>
              <button onClick={()=>setView("novaUnidade")} style={{ ...ghostBtn(),display:"flex",alignItems:"center",gap:6 }}>🏢 Nova Unidade</button>
              <button onClick={()=>setView("novoEst")} style={yellowBtn()}>+ Estagiário</button>
            </>}
          </div>}
        </div>

        {canEdit&&<div style={{ display:"flex",gap:8,marginBottom:14,flexWrap:"wrap" }}>
          {[["Cidade","cidade",["Todas",...cidades]],["Unidade","unidade",["Todas",...unidadesFiltradas]],["Período","periodo",["Todos",...[...new Set(ests.map(e=>e.periodo))]]],["Status","status",["Todos","Em andamento","Atenção","Concluído"]]].map(([label,key,opts])=>(
            <div key={key} style={{ display:"flex",flexDirection:"column",gap:2 }}>
              <div style={{ fontSize:10,color:"rgba(255,255,255,0.4)",fontWeight:700,letterSpacing:1 }}>{label.toUpperCase()}</div>
              <select value={filtros[key]} onChange={e=>setFiltros({...filtros,[key]:e.target.value})} style={{ ...darkInp,width:"auto",padding:"5px 8px",fontSize:12 }}>
                {opts.map(o=><option key={o}>{o}</option>)}
              </select>
            </div>
          ))}
        </div>}

        <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8,marginBottom:16 }}>
          {[["TOTAL",filtrados.length,SF_YELLOW],["ANDAMENTO",filtrados.filter(e=>e.status==="Em andamento").length,"#60BFFF"],["ATENÇÃO",filtrados.filter(e=>e.status==="Atenção").length,"#FFD700"],["CONCLUÍDOS",filtrados.filter(e=>e.status==="Concluído").length,"#90EE90"]].map(([l,v,c])=>(
            <div key={l} style={{ background:SF_DARK_GRAY,border:`1px solid ${c}25`,borderRadius:10,padding:"12px 8px",textAlign:"center" }}>
              <div style={{ fontSize:22,fontWeight:900,color:c }}>{v}</div>
              <div style={{ fontSize:9,color:"rgba(255,255,255,0.4)",marginTop:2,letterSpacing:1 }}>{l}</div>
            </div>
          ))}
        </div>

        <div style={{ display:"grid",gap:10 }}>
          {filtrados.map(e=>{
            const av = colorFor(e.initials||"A");
            const st = STATUS_CONFIG[e.status];
            const tarefasOk=(e.tarefas||[]).filter(t=>t.feito).length;
            const trilhaCon=(e.trilha_status||[]).filter(t=>t.concluido).length;
            const trilhaTot=TRILHA.reduce((a,m)=>a+m.temas.length,0);
            const pres=(e.presencas||[]).filter(p=>p.presente).length;
            const abPct=Math.min(100,Math.round(((e.evolucao?.abordagens_valor||0)/(e.evolucao?.abordagens_meta||60))*100));
            return (
              <div key={e.id} onClick={()=>{ setSel(e.id); setView("detail"); setAba("Tarefas"); }} style={{ background:SF_DARK_GRAY,border:"0.5px solid rgba(255,215,0,0.15)",borderRadius:12,padding:"14px 16px",cursor:"pointer" }}>
                <div style={{ display:"flex",alignItems:"center",gap:12,marginBottom:12 }}>
                  <div style={{ width:44,height:44,borderRadius:"50%",background:av.bg,border:`2px solid ${av.color}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:15,fontWeight:700,color:av.color,flexShrink:0 }}>{e.initials}</div>
                  <div style={{ flex:1 }}><div style={{ fontWeight:700,fontSize:15,color:"#fff" }}>{e.nome}</div><div style={{ fontSize:11,color:"rgba(255,255,255,0.4)",marginTop:1 }}>Smart Fit {e.unidade} · {e.cidade} · {e.periodo}</div></div>
                  <span style={{ fontSize:10,padding:"3px 10px",borderRadius:6,background:st.bg,color:st.color,fontWeight:700 }}>{e.status}</span>
                </div>
                <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8 }}>
                  {[["Tarefas",`${tarefasOk}/${(e.tarefas||[]).length}`,(e.tarefas||[]).length?Math.round((tarefasOk/(e.tarefas||[]).length)*100):0,SF_YELLOW],["Trilha",`${trilhaCon}/${trilhaTot}`,Math.round((trilhaCon/trilhaTot)*100),"#60BFFF"],["Presenças",`${pres}/${(e.presencas||[]).length}`,(e.presencas||[]).length?Math.round((pres/(e.presencas||[]).length)*100):0,"#90EE90"],["Abordagens",`${e.evolucao?.abordagens_valor||0}/${e.evolucao?.abordagens_meta||60}`,abPct,"#FF80C0"]].map(([l,v,pct,c])=>(
                    <div key={l} style={{ background:"rgba(255,255,255,0.04)",borderRadius:8,padding:"8px 10px",textAlign:"center",border:`0.5px solid ${c}25` }}>
                      <div style={{ fontSize:13,fontWeight:700,color:c }}>{v}</div>
                      <div style={{ fontSize:10,color:"rgba(255,255,255,0.4)",marginTop:1 }}>{l}</div>
                      <div style={{ height:3,background:`${c}25`,borderRadius:2,marginTop:6 }}><div style={{ width:`${pct}%`,height:"100%",background:c,borderRadius:2 }} /></div>
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