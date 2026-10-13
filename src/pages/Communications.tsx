import { useState } from 'react';
import { Avatar, Badge, Button, Card, CardHeader, PageHeader, StatCard } from '../components';
import { CHAT_CHANNELS, CHAT_MESSAGES, type ChatMessage } from '../data';

const MEMBERS = [
  { name: 'فهد العجمي', role: 'قائد العمليات', online: true },
  { name: 'سارة النعيمي', role: 'مشرف ليلة', online: true },
  { name: 'ماجد القحطاني', role: 'قائد فريق', online: true },
  { name: 'سلطان العنزي', role: 'قائد فريق', online: false },
  { name: 'منصور الشمراني', role: 'مفتش أول', online: true },
  { name: 'أمل الفهد', role: 'مهندسة مساحة', online: false },
  { name: 'ريم الدوسري', role: 'استقبال بلاغات', online: true },
];

export default function Communications() {
  const [channelId, setChannelId] = useState('CH-01');
  const [messages, setMessages] = useState<Record<string, ChatMessage[]>>(CHAT_MESSAGES);
  const [draft, setDraft] = useState('');

  const channel = CHAT_CHANNELS.find((c) => c.id === channelId) ?? CHAT_CHANNELS[0];
  const list = messages[channelId] ?? [];

  const send = () => {
    const text = draft.trim();
    if (!text) return;
    const now = new Date();
    const time = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    setMessages((m) => ({
      ...m,
      [channelId]: [...(m[channelId] ?? []), { id: `m${Date.now()}`, author: 'أنت', time, text, mine: true }],
    }));
    setDraft('');
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="التواصل الجماعي"
        subtitle="محادثات فورية وصوت وفيديو ومشاركة الملفات والموقع حسب الإدارات"
        icon="fa-solid fa-comments"
        actions={
          <>
            <Button variant="outline" icon="fa-solid fa-video">اجتماع فيديو</Button>
            <Button variant="outline" icon="fa-solid fa-phone">مكالمة صوتية</Button>
            <Button icon="fa-solid fa-plus">محادثة جديدة</Button>
          </>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="القنوات النشطة" value={CHAT_CHANNELS.length} icon="fa-solid fa-tower-broadcast" tone="navy" sub="إدارات وفرق" />
        <StatCard label="رسائل غير مقروءة" value={CHAT_CHANNELS.reduce((s, c) => s + c.unread, 0)} icon="fa-solid fa-envelope" tone="red" sub="في جميع القنوات" />
        <StatCard label="أعضاء متصلون" value="18" icon="fa-solid fa-user-check" tone="emerald" sub="من أصل 42 عضواً" />
        <StatCard label="اجتماعات اليوم" value={3} icon="fa-solid fa-video" tone="violet" sub="صوتية وفيديو" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[275px_1fr_290px] gap-5">
        {/* القنوات */}
        <Card className="hidden xl:flex flex-col overflow-hidden">
          <CardHeader title="القنوات" subtitle="حسب الإدارات والفرق" icon="fa-solid fa-list" />
          <div className="px-3 pb-3 space-y-1.5 overflow-y-auto flex-1">
            {CHAT_CHANNELS.map((c) => (
              <button
                key={c.id}
                onClick={() => setChannelId(c.id)}
                className={`w-full flex items-center gap-3 rounded-xl p-3 text-right transition-all ${
                  channelId === c.id ? 'bg-navy-950 text-white' : 'hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`}
              >
                <span className={`icon-box h-9 w-9 text-sm shrink-0 ${channelId === c.id ? 'bg-white/15 text-white' : 'bg-navy-100 text-navy-800 dark:bg-navy-800/50 dark:text-navy-200'}`}>
                  <i className={c.icon} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className={`block text-[13px] font-extrabold truncate ${channelId === c.id ? 'text-white' : 'text-slate-700 dark:text-slate-200'}`}>{c.name}</span>
                  <span className={`block text-[10px] font-bold ${channelId === c.id ? 'text-slate-300' : 'text-slate-400'}`}>{c.kind} • {c.members} أعضاء</span>
                </span>
                {c.unread > 0 && (
                  <span className="text-[10px] rounded-full bg-red-500 text-white px-1.5 py-0.5 font-extrabold">{c.unread}</span>
                )}
              </button>
            ))}
          </div>
        </Card>

        {/* المحادثة */}
        <Card className="flex flex-col overflow-hidden h-[640px]">
          <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-200 dark:border-slate-800">
            <span className="icon-box h-10 w-10 text-sm bg-navy-950 text-white">
              <i className={channel.icon} />
            </span>
            <div className="min-w-0">
              <h3 className="text-sm font-extrabold text-slate-800 dark:text-slate-100 truncate">{channel.name}</h3>
              <p className="text-[11px] text-slate-400">{channel.members} عضواً — {MEMBERS.filter((m) => m.online).length} متصلون الآن</p>
            </div>
            <div className="flex items-center gap-1.5 ms-auto">
              <Badge tone="active" dot pulse>مباشر</Badge>
              <button className="h-9 w-9 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-navy-950 hover:text-white transition-colors" title="مكالمة صوتية">
                <i className="fa-solid fa-phone text-xs" />
              </button>
              <button className="h-9 w-9 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-navy-950 hover:text-white transition-colors" title="مكالمة فيديو">
                <i className="fa-solid fa-video text-xs" />
              </button>
              <button className="h-9 w-9 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-navy-950 hover:text-white transition-colors" title="بحث">
                <i className="fa-solid fa-magnifying-glass text-xs" />
              </button>
            </div>
          </div>

          {/* قنوات للجوال */}
          <div className="xl:hidden flex gap-1.5 px-4 py-2 overflow-x-auto scrollbar-none border-b border-slate-100 dark:border-slate-800">
            {CHAT_CHANNELS.map((c) => (
              <button
                key={c.id}
                onClick={() => setChannelId(c.id)}
                className={`chip whitespace-nowrap ${channelId === c.id ? 'bg-navy-950 text-white' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'}`}
              >
                {c.name}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-slate-50/60 dark:bg-slate-950/40">
            {list.map((m) => {
              if (m.system) {
                return (
                  <div key={m.id} className="text-center">
                    <span className="chip bg-slate-200 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                      <i className="fa-solid fa-circle-info" />
                      {m.text}
                    </span>
                  </div>
                );
              }
              const mine = !!m.mine;
              return (
                <div key={m.id} className={`flex gap-2.5 ${mine ? 'justify-end' : 'justify-start'} animate-slide-up`}>
                  {!mine && <Avatar name={m.author} size="sm" tone="sky" />}
                  <div className={`max-w-[75%] ${mine ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
                    <div className={`flex items-center gap-2 text-[10px] text-slate-400 font-bold ${mine ? 'flex-row-reverse' : ''}`}>
                      <span>{m.author}</span>
                      <span>{m.time}</span>
                    </div>
                    <div
                      className={`px-4 py-2.5 text-[13px] leading-relaxed ${
                        mine
                          ? 'bg-navy-950 text-white rounded-2xl rounded-ee-sm shadow-md shadow-navy-950/15'
                          : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-2xl rounded-es-sm border border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      {m.text}
                      {m.file && (
                        <div className={`flex items-center gap-3 rounded-xl p-2.5 mt-1 ${mine ? 'bg-white/10' : 'bg-slate-100 dark:bg-slate-700/60'}`}>
                          <i className="fa-solid fa-file-arrow-down text-lg" />
                          <div className="min-w-0">
                            <p className="text-[12px] font-extrabold truncate">{m.file.name}</p>
                            <p className={`text-[10px] ${mine ? 'text-slate-300' : 'text-slate-400'}`}>{m.file.size}</p>
                          </div>
                          <i className="fa-solid fa-download ms-auto" />
                        </div>
                      )}
                      {m.location && (
                        <div className={`flex items-center gap-3 rounded-xl p-2.5 mt-1 ${mine ? 'bg-white/10' : 'bg-slate-100 dark:bg-slate-700/60'}`}>
                          <i className="fa-solid fa-location-crosshairs text-lg text-emerald-500" />
                          <div className="min-w-0">
                            <p className="text-[12px] font-extrabold truncate">{m.location}</p>
                            <p className={`text-[10px] ${mine ? 'text-slate-300' : 'text-slate-400'}`}>مشاركة موقع مباشر</p>
                          </div>
                          <i className="fa-solid fa-map ms-auto" />
                        </div>
                      )}
                    </div>
                  </div>
                  {mine && <Avatar name="أنت" size="sm" tone="navy" />}
                </div>
              );
            })}
          </div>

          {/* المحرر */}
          <div className="border-t border-slate-200 dark:border-slate-800 p-3">
            <div className="flex items-center gap-2">
              <button className="h-10 w-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-navy-950 hover:text-white transition-colors shrink-0" title="مرفق">
                <i className="fa-solid fa-paperclip" />
              </button>
              <button className="h-10 w-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-navy-950 hover:text-white transition-colors shrink-0" title="صورة">
                <i className="fa-solid fa-image" />
              </button>
              <button className="h-10 w-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-navy-950 hover:text-white transition-colors shrink-0" title="موقع">
                <i className="fa-solid fa-location-dot" />
              </button>
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && send()}
                className="input flex-1"
                placeholder={`اكتب رسالة إلى ${channel.name}...`}
              />
              <button className="h-10 w-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-red-500 hover:text-white transition-colors shrink-0" title="رسالة صوتية">
                <i className="fa-solid fa-microphone" />
              </button>
              <Button icon="fa-solid fa-paper-plane" onClick={send} className="shrink-0">إرسال</Button>
            </div>
            <p className="text-[10px] text-slate-400 mt-2 text-center">
              <i className="fa-solid fa-shield-halved ms-1" />
              المحادثات مشفّرة ومُسجَّلة في سجل العمليات لأغراض التدقيق
            </p>
          </div>
        </Card>

        {/* الأعضاء والملفات */}
        <div className="hidden xl:flex flex-col gap-5">
          <Card className="flex-1">
            <CardHeader title="الأعضاء" subtitle={`${MEMBERS.filter((m) => m.online).length} متصل`} icon="fa-solid fa-users" tone="emerald" />
            <div className="px-4 pb-4 space-y-2.5">
              {MEMBERS.map((m) => (
                <div key={m.name} className="flex items-center gap-3">
                  <span className="relative">
                    <Avatar name={m.name} size="sm" tone={m.online ? 'emerald' : 'slate'} />
                    <span className={`absolute -bottom-0.5 -end-0.5 h-2.5 w-2.5 rounded-full ring-2 ring-white dark:ring-slate-900 ${m.online ? 'bg-emerald-500' : 'bg-slate-400'}`} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[12px] font-extrabold text-slate-700 dark:text-slate-200 truncate">{m.name}</p>
                    <p className="text-[10px] text-slate-400">{m.role}</p>
                  </div>
                  <div className="flex gap-1 ms-auto">
                    <button className="h-7 w-7 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-navy-950 hover:text-white transition-colors">
                      <i className="fa-solid fa-phone text-[10px]" />
                    </button>
                    <button className="h-7 w-7 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-navy-950 hover:text-white transition-colors">
                      <i className="fa-solid fa-comment text-[10px]" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <CardHeader title="ملفات مشتركة" icon="fa-solid fa-paperclip" tone="sky" />
            <div className="px-4 pb-4 space-y-2.5">
              {[
                { n: 'خريطة-التأثير-المروري.pdf', s: '1.2 م.ب', i: 'fa-solid fa-file-pdf', c: 'text-red-500' },
                { n: 'مخطط-الإنارة-الملقا.dwg', s: '6.4 م.ب', i: 'fa-solid fa-compass-drafting', c: 'text-sky-500' },
                { n: 'صورة-الموقع-1.jpg', s: '2.1 م.ب', i: 'fa-solid fa-file-image', c: 'text-violet-500' },
              ].map((f) => (
                <div key={f.n} className="flex items-center gap-3 rounded-xl border border-slate-200 dark:border-slate-700 p-2.5">
                  <i className={`${f.i} ${f.c} text-lg`} />
                  <div className="min-w-0">
                    <p className="text-[12px] font-extrabold text-slate-700 dark:text-slate-200 truncate">{f.n}</p>
                    <p className="text-[10px] text-slate-400">{f.s}</p>
                  </div>
                  <i className="fa-solid fa-download text-slate-400 text-xs ms-auto" />
                </div>
              ))}
              <Button variant="outline" block size="sm" icon="fa-solid fa-folder-open">عرض كل الملفات</Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
