import Icon from "@/components/ui/icon";

interface ForumCard {
  id: string;
  name: string;
  icon: string;
  color: string;
  locked?: boolean;
}

interface FormExample {
  id: string;
  name: string;
  icon: string;
}

const forums: ForumCard[] = [
  { id: "vk", name: "ВКонтакте", icon: "MessageCircle", color: "#4F7BE8", locked: false },
  { id: "discord", name: "Discord", icon: "Headphones", color: "#5865F2", locked: true },
  { id: "telegram", name: "Telegram", icon: "Send", color: "#26A5E4", locked: true },
];

const formExamples: FormExample[] = [
  { id: "complaint", name: "Жалоба на сотрудника", icon: "CloudAlert" },
  { id: "dispute", name: "Спор / Апелляция", icon: "CloudLightning" },
  { id: "material", name: "Material Report", icon: "Cloud" },
  { id: "comment", name: "Комментарий", icon: "CloudOff" },
];

export default function PluginShowcase() {
  return (
    <div
      className="min-h-screen text-white"
      style={{
        background:
          "radial-gradient(ellipse at 50% 0%, #1a1030 0%, #0d0d14 60%, #080810 100%)",
        backgroundImage: `
          radial-gradient(ellipse at 50% 0%, #1a1030 0%, #0d0d14 60%, #080810 100%),
          url('https://cdn.poehali.dev/projects/e2914489-88ab-4a41-8ae3-adfd1e6c1bed/bucket/23277681-d34f-4167-b9a9-1a974f7876c1.png')
        `,
        backgroundSize: "cover",
        backgroundPosition: "center top",
        backgroundBlendMode: "multiply",
      }}
    >
      <div
        className="min-h-screen"
        style={{
          background:
            "linear-gradient(to bottom, rgba(10,8,20,0.55) 0%, rgba(8,6,16,0.85) 60%, rgba(6,4,12,0.97) 100%)",
        }}
      >
        {/* Sidebar + Content layout */}
        <div className="flex h-screen overflow-hidden">
          {/* Sidebar */}
          <aside
            className="w-14 flex flex-col items-center py-5 gap-4 shrink-0 border-r"
            style={{ background: "rgba(15,10,30,0.8)", borderColor: "rgba(100,60,200,0.2)" }}
          >
            <div
              className="w-8 h-8 rounded flex items-center justify-center mb-2"
              style={{ background: "rgba(120,80,220,0.3)", border: "1px solid rgba(120,80,220,0.5)" }}
            >
              <Icon name="Zap" size={16} style={{ color: "#a78bfa" }} />
            </div>
            {[
              { icon: "LayoutDashboard" },
              { icon: "FileText" },
              { icon: "Users" },
              { icon: "Settings" },
              { icon: "Bell" },
            ].map(({ icon }) => (
              <button
                key={icon}
                className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors hover:bg-white/10"
                style={{ color: "rgba(160,130,220,0.7)" }}
              >
                <Icon name={icon} size={17} />
              </button>
            ))}
          </aside>

          {/* Main */}
          <main className="flex-1 overflow-auto p-6 space-y-6">
            {/* Header */}
            <div>
              <h1 className="text-white font-bold text-xl tracking-wide">
                XenForo Advanced Forms
              </h1>
              <p style={{ color: "rgba(180,150,255,0.6)" }} className="text-sm mt-1">
                Плагин для создания форм заявок
              </p>
            </div>

            {/* Примеры форумов */}
            <section>
              <h2 className="text-white font-semibold text-sm mb-3 tracking-wider uppercase opacity-70">
                Примеры форумов
              </h2>
              <div className="space-y-2">
                {forums.map((forum) => (
                  <div
                    key={forum.id}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all cursor-pointer hover:opacity-90"
                    style={{
                      background: "rgba(30,20,60,0.7)",
                      border: "1px solid rgba(100,60,200,0.3)",
                    }}
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: `${forum.color}22`, border: `1px solid ${forum.color}55` }}
                    >
                      <Icon name={forum.icon} size={16} style={{ color: forum.color }} />
                    </div>
                    <span className="flex-1 text-sm font-medium" style={{ color: "rgba(220,200,255,0.9)" }}>
                      {forum.name}
                    </span>
                    {forum.locked ? (
                      <Icon name="Lock" size={14} style={{ color: "rgba(120,80,200,0.6)" }} />
                    ) : (
                      <Icon name="ChevronRight" size={14} style={{ color: "rgba(120,80,200,0.6)" }} />
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Примеры форм */}
            <section>
              <h2 className="text-white font-semibold text-sm mb-3 tracking-wider uppercase opacity-70">
                Примеры форм
              </h2>
              <div className="space-y-2">
                {formExamples.map((form) => (
                  <div
                    key={form.id}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all cursor-pointer hover:opacity-90"
                    style={{
                      background: "rgba(20,15,45,0.8)",
                      border: "1px solid rgba(80,50,160,0.25)",
                    }}
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                      style={{
                        background: "rgba(90,60,180,0.2)",
                        border: "1px solid rgba(90,60,180,0.4)",
                      }}
                    >
                      <Icon name={form.icon} size={15} style={{ color: "#a78bfa" }} />
                    </div>
                    <span className="flex-1 text-sm" style={{ color: "rgba(200,180,255,0.8)" }}>
                      {form.name}
                    </span>
                    <Icon name="Lock" size={13} style={{ color: "rgba(100,70,180,0.5)" }} />
                  </div>
                ))}
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
