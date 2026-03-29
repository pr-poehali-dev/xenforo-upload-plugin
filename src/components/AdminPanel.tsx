import { useState } from "react";
import Icon from "@/components/ui/icon";

type FieldType = "text" | "textarea" | "dropdown" | "date" | "url";

interface FormField {
  id: string;
  label: string;
  type: FieldType;
  placeholder: string;
  options?: string[];
  required: boolean;
}

interface Category {
  id: string;
  name: string;
  cities: string[];
}

const FIELD_TYPES: { value: FieldType; label: string; icon: string }[] = [
  { value: "text", label: "Текст (строка)", icon: "Type" },
  { value: "textarea", label: "Текст (большой)", icon: "AlignLeft" },
  { value: "dropdown", label: "Выпадающий список", icon: "ChevronDown" },
  { value: "date", label: "Дата", icon: "Calendar" },
  { value: "url", label: "Ссылка / URL", icon: "Link" },
];

const generateId = () => Math.random().toString(36).slice(2, 9);

const TABS = ["Поля формы", "Фракции и города", "Предпросмотр"];

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState(0);
  const [fields, setFields] = useState<FormField[]>([
    { id: "f1", label: "Ваш никнейм", type: "text", placeholder: "Пример: Maksim_Igrokov", required: true },
    { id: "f2", label: "Никнейм сотрудника", type: "text", placeholder: "Пример: Nikita_Policeyskiy", required: true },
    { id: "f3", label: "Скриншот/видео от вашего лица", type: "url", placeholder: "Пример: https://imgur.com/screen07", required: false },
    { id: "f4", label: "Описание ситуации", type: "textarea", placeholder: "Опишите суть жалобы", required: true },
  ]);
  const [categories, setCategories] = useState<Category[]>([
    { id: "c1", name: "ГУВД", cities: ["Москва", "Санкт-Петербург"] },
    { id: "c2", name: "ФСБ", cities: ["Владивосток"] },
  ]);

  const [editingField, setEditingField] = useState<FormField | null>(null);
  const [newFieldType, setNewFieldType] = useState<FieldType>("text");
  const [newOption, setNewOption] = useState("");
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCityName, setNewCityName] = useState<Record<string, string>>({});
  const [dragOver, setDragOver] = useState<string | null>(null);
  const [dragging, setDragging] = useState<string | null>(null);

  const addField = () => {
    const newField: FormField = {
      id: generateId(),
      label: "Новое поле",
      type: newFieldType,
      placeholder: "",
      required: false,
      options: newFieldType === "dropdown" ? ["Вариант 1"] : undefined,
    };
    setFields([...fields, newField]);
    setEditingField(newField);
  };

  const updateField = (updated: FormField) => {
    setFields(fields.map((f) => (f.id === updated.id ? updated : f)));
    setEditingField(updated);
  };

  const deleteField = (id: string) => {
    setFields(fields.filter((f) => f.id !== id));
    if (editingField?.id === id) setEditingField(null);
  };

  const addCategory = () => {
    if (!newCategoryName.trim()) return;
    setCategories([...categories, { id: generateId(), name: newCategoryName.trim(), cities: [] }]);
    setNewCategoryName("");
  };

  const deleteCategory = (id: string) => {
    setCategories(categories.filter((c) => c.id !== id));
  };

  const addCity = (catId: string) => {
    const city = (newCityName[catId] || "").trim();
    if (!city) return;
    setCategories(categories.map((c) => c.id === catId ? { ...c, cities: [...c.cities, city] } : c));
    setNewCityName({ ...newCityName, [catId]: "" });
  };

  const deleteCity = (catId: string, city: string) => {
    setCategories(categories.map((c) => c.id === catId ? { ...c, cities: c.cities.filter((ci) => ci !== city) } : c));
  };

  const addOption = () => {
    if (!editingField || !newOption.trim()) return;
    updateField({ ...editingField, options: [...(editingField.options || []), newOption.trim()] });
    setNewOption("");
  };

  const removeOption = (opt: string) => {
    if (!editingField) return;
    updateField({ ...editingField, options: (editingField.options || []).filter((o) => o !== opt) });
  };

  const moveField = (fromIdx: number, toIdx: number) => {
    const arr = [...fields];
    const [item] = arr.splice(fromIdx, 1);
    arr.splice(toIdx, 0, item);
    setFields(arr);
  };

  return (
    <div className="min-h-screen bg-[#1a1c1e] text-[#e0e0e0] font-['Golos_Text',sans-serif]">
      {/* Sidebar */}
      <div className="flex h-screen overflow-hidden">
        <aside className="w-64 bg-[#111315] border-r border-[#2a2d30] flex flex-col shrink-0">
          <div className="p-5 border-b border-[#2a2d30]">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded bg-[#4ade80] flex items-center justify-center">
                <Icon name="Shield" size={14} className="text-black" />
              </div>
              <span className="font-semibold text-white text-sm">Владивосток RP</span>
            </div>
          </div>

          <nav className="flex-1 p-3 space-y-1">
            {[
              { icon: "Settings", label: "Параметры" },
              { icon: "Puzzle", label: "Плагины" },
              { icon: "FileText", label: "Контент" },
              { icon: "FormInput", label: "Advanced Forms", active: true },
              { icon: "MessageSquare", label: "Форум" },
              { icon: "Megaphone", label: "Связь" },
              { icon: "Users", label: "Пользователи" },
              { icon: "ShieldCheck", label: "Группы и права" },
              { icon: "Palette", label: "Внешний вид" },
              { icon: "Wrench", label: "Инструменты" },
              { icon: "ScrollText", label: "Журналы" },
            ].map((item) => (
              <button
                key={item.label}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                  item.active
                    ? "bg-[#4ade80]/15 text-[#4ade80] border border-[#4ade80]/30"
                    : "text-[#9ca3af] hover:text-white hover:bg-[#2a2d30]"
                }`}
              >
                <Icon name={item.icon} size={16} />
                {item.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-auto">
          {/* Header */}
          <div className="bg-[#111315] border-b border-[#2a2d30] px-6 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-white font-semibold text-lg">Оформление жалобы</h1>
              <p className="text-[#6b7280] text-xs mt-0.5">Конструктор формы жалоб</p>
            </div>
            <button className="px-4 py-2 bg-[#4ade80] text-black text-sm font-semibold rounded-md hover:bg-[#22c55e] transition-colors flex items-center gap-2">
              <Icon name="Save" size={15} />
              Сохранить
            </button>
          </div>

          {/* Tabs */}
          <div className="px-6 pt-4 border-b border-[#2a2d30]">
            <div className="flex gap-1">
              {TABS.map((tab, i) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(i)}
                  className={`px-4 py-2.5 text-sm font-medium rounded-t-md transition-colors border-b-2 ${
                    activeTab === i
                      ? "text-[#4ade80] border-[#4ade80] bg-[#4ade80]/5"
                      : "text-[#6b7280] border-transparent hover:text-white"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6">
            {/* TAB: Поля формы */}
            {activeTab === 0 && (
              <div className="flex gap-5">
                {/* Left: field list */}
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-white font-medium text-sm">Поля формы</h2>
                    <span className="text-[#6b7280] text-xs">{fields.length} полей</span>
                  </div>

                  {fields.map((field, idx) => (
                    <div
                      key={field.id}
                      draggable
                      onDragStart={() => setDragging(field.id)}
                      onDragOver={(e) => { e.preventDefault(); setDragOver(field.id); }}
                      onDrop={() => {
                        if (dragging && dragging !== field.id) {
                          const fromIdx = fields.findIndex((f) => f.id === dragging);
                          moveField(fromIdx, idx);
                        }
                        setDragging(null);
                        setDragOver(null);
                      }}
                      onDragEnd={() => { setDragging(null); setDragOver(null); }}
                      onClick={() => setEditingField(field)}
                      className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                        editingField?.id === field.id
                          ? "border-[#4ade80]/50 bg-[#4ade80]/5"
                          : dragOver === field.id
                          ? "border-[#4ade80]/30 bg-[#2a2d30]"
                          : "border-[#2a2d30] bg-[#1e2124] hover:border-[#3a3d40]"
                      }`}
                    >
                      <Icon name="GripVertical" size={14} className="text-[#4b5563] cursor-grab" />
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-medium truncate">{field.label}</p>
                        <p className="text-[#6b7280] text-xs mt-0.5">
                          {FIELD_TYPES.find((t) => t.value === field.type)?.label}
                          {field.required && <span className="ml-2 text-[#4ade80]">• обязательное</span>}
                        </p>
                      </div>
                      <button
                        onClick={(e) => { e.stopPropagation(); deleteField(field.id); }}
                        className="text-[#4b5563] hover:text-red-400 transition-colors p-1 rounded"
                      >
                        <Icon name="Trash2" size={14} />
                      </button>
                    </div>
                  ))}

                  {/* Add field */}
                  <div className="flex gap-2 mt-4 pt-4 border-t border-[#2a2d30]">
                    <select
                      value={newFieldType}
                      onChange={(e) => setNewFieldType(e.target.value as FieldType)}
                      className="flex-1 bg-[#1e2124] border border-[#2a2d30] text-[#e0e0e0] text-sm rounded-md px-3 py-2 focus:outline-none focus:border-[#4ade80]/50"
                    >
                      {FIELD_TYPES.map((t) => (
                        <option key={t.value} value={t.value}>{t.label}</option>
                      ))}
                    </select>
                    <button
                      onClick={addField}
                      className="px-4 py-2 bg-[#4ade80] text-black text-sm font-semibold rounded-md hover:bg-[#22c55e] transition-colors flex items-center gap-1.5"
                    >
                      <Icon name="Plus" size={15} />
                      Добавить
                    </button>
                  </div>
                </div>

                {/* Right: field editor */}
                <div className="w-80 shrink-0">
                  {editingField ? (
                    <div className="bg-[#1e2124] border border-[#2a2d30] rounded-xl p-4 space-y-4 sticky top-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-white font-medium text-sm">Настройка поля</h3>
                        <button onClick={() => setEditingField(null)} className="text-[#6b7280] hover:text-white">
                          <Icon name="X" size={15} />
                        </button>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <label className="text-[#9ca3af] text-xs mb-1.5 block">Название поля</label>
                          <input
                            value={editingField.label}
                            onChange={(e) => updateField({ ...editingField, label: e.target.value })}
                            className="w-full bg-[#111315] border border-[#2a2d30] text-white text-sm rounded-md px-3 py-2 focus:outline-none focus:border-[#4ade80]/50"
                            placeholder="Название"
                          />
                        </div>

                        <div>
                          <label className="text-[#9ca3af] text-xs mb-1.5 block">Тип поля</label>
                          <select
                            value={editingField.type}
                            onChange={(e) => updateField({ ...editingField, type: e.target.value as FieldType, options: e.target.value === "dropdown" ? (editingField.options || ["Вариант 1"]) : undefined })}
                            className="w-full bg-[#111315] border border-[#2a2d30] text-[#e0e0e0] text-sm rounded-md px-3 py-2 focus:outline-none focus:border-[#4ade80]/50"
                          >
                            {FIELD_TYPES.map((t) => (
                              <option key={t.value} value={t.value}>{t.label}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="text-[#9ca3af] text-xs mb-1.5 block">Подсказка (placeholder)</label>
                          <input
                            value={editingField.placeholder}
                            onChange={(e) => updateField({ ...editingField, placeholder: e.target.value })}
                            className="w-full bg-[#111315] border border-[#2a2d30] text-white text-sm rounded-md px-3 py-2 focus:outline-none focus:border-[#4ade80]/50"
                            placeholder="Пример: Введите значение"
                          />
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateField({ ...editingField, required: !editingField.required })}
                            className={`w-9 h-5 rounded-full transition-colors relative ${editingField.required ? "bg-[#4ade80]" : "bg-[#3a3d40]"}`}
                          >
                            <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-transform ${editingField.required ? "translate-x-4" : "translate-x-0.5"}`} />
                          </button>
                          <span className="text-[#9ca3af] text-sm">Обязательное поле</span>
                        </div>

                        {editingField.type === "dropdown" && (
                          <div>
                            <label className="text-[#9ca3af] text-xs mb-1.5 block">Варианты выбора</label>
                            <div className="space-y-1.5 mb-2">
                              {(editingField.options || []).map((opt) => (
                                <div key={opt} className="flex items-center gap-2 bg-[#111315] rounded-md px-3 py-1.5">
                                  <span className="flex-1 text-white text-sm">{opt}</span>
                                  <button onClick={() => removeOption(opt)} className="text-[#4b5563] hover:text-red-400">
                                    <Icon name="X" size={12} />
                                  </button>
                                </div>
                              ))}
                            </div>
                            <div className="flex gap-2">
                              <input
                                value={newOption}
                                onChange={(e) => setNewOption(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && addOption()}
                                placeholder="Новый вариант"
                                className="flex-1 bg-[#111315] border border-[#2a2d30] text-white text-sm rounded-md px-3 py-1.5 focus:outline-none focus:border-[#4ade80]/50"
                              />
                              <button onClick={addOption} className="px-3 py-1.5 bg-[#4ade80]/15 text-[#4ade80] text-sm rounded-md hover:bg-[#4ade80]/25 border border-[#4ade80]/30">
                                <Icon name="Plus" size={14} />
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="bg-[#1e2124] border border-[#2a2d30] rounded-xl p-6 text-center">
                      <Icon name="MousePointerClick" size={28} className="text-[#3a3d40] mx-auto mb-2" />
                      <p className="text-[#6b7280] text-sm">Нажмите на поле слева для редактирования</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB: Фракции и города */}
            {activeTab === 1 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-white font-medium text-sm">Фракции и города</h2>
                  <span className="text-[#6b7280] text-xs">{categories.length} фракций</span>
                </div>

                {categories.map((cat) => (
                  <div key={cat.id} className="bg-[#1e2124] border border-[#2a2d30] rounded-xl p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-2 h-2 rounded-full bg-[#4ade80]" />
                      <h3 className="text-white font-semibold text-sm flex-1">{cat.name}</h3>
                      <button onClick={() => deleteCategory(cat.id)} className="text-[#4b5563] hover:text-red-400 transition-colors">
                        <Icon name="Trash2" size={14} />
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-3">
                      {cat.cities.map((city) => (
                        <span key={city} className="flex items-center gap-1.5 bg-[#111315] text-[#d1d5db] text-xs rounded-md px-2.5 py-1 border border-[#2a2d30]">
                          {city}
                          <button onClick={() => deleteCity(cat.id, city)} className="text-[#4b5563] hover:text-red-400 ml-0.5">
                            <Icon name="X" size={10} />
                          </button>
                        </span>
                      ))}
                      {cat.cities.length === 0 && (
                        <span className="text-[#4b5563] text-xs">Нет городов</span>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <input
                        value={newCityName[cat.id] || ""}
                        onChange={(e) => setNewCityName({ ...newCityName, [cat.id]: e.target.value })}
                        onKeyDown={(e) => e.key === "Enter" && addCity(cat.id)}
                        placeholder="Добавить город..."
                        className="flex-1 bg-[#111315] border border-[#2a2d30] text-white text-sm rounded-md px-3 py-1.5 focus:outline-none focus:border-[#4ade80]/50"
                      />
                      <button onClick={() => addCity(cat.id)} className="px-3 py-1.5 bg-[#4ade80]/15 text-[#4ade80] text-sm rounded-md hover:bg-[#4ade80]/25 border border-[#4ade80]/30 flex items-center gap-1">
                        <Icon name="Plus" size={14} />
                        Добавить
                      </button>
                    </div>
                  </div>
                ))}

                {/* Add category */}
                <div className="bg-[#1e2124] border border-dashed border-[#2a2d30] rounded-xl p-4 flex gap-2">
                  <input
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addCategory()}
                    placeholder="Название новой фракции..."
                    className="flex-1 bg-[#111315] border border-[#2a2d30] text-white text-sm rounded-md px-3 py-2 focus:outline-none focus:border-[#4ade80]/50"
                  />
                  <button
                    onClick={addCategory}
                    className="px-4 py-2 bg-[#4ade80] text-black text-sm font-semibold rounded-md hover:bg-[#22c55e] transition-colors flex items-center gap-1.5"
                  >
                    <Icon name="Plus" size={15} />
                    Фракция
                  </button>
                </div>
              </div>
            )}

            {/* TAB: Предпросмотр */}
            {activeTab === 2 && (
              <div className="max-w-2xl mx-auto">
                <div className="bg-[#1e2124] border border-[#2a2d30] rounded-xl overflow-hidden">
                  <div className="px-6 py-4 border-b-2 border-[#4ade80]">
                    <h2 className="text-[#4ade80] font-semibold text-lg">Оформление жалобы:</h2>
                  </div>
                  <div className="p-6 space-y-5">
                    {categories.length > 0 && (
                      <>
                        <div>
                          <p className="text-white text-sm font-medium text-center mb-2">Выберите фракцию:</p>
                          <select className="w-full bg-[#111315] border border-[#2a2d30] text-[#9ca3af] text-sm rounded-md px-3 py-2.5">
                            <option>Открыть список фракций</option>
                            {categories.map((c) => <option key={c.id}>{c.name}</option>)}
                          </select>
                        </div>
                        <div>
                          <p className="text-white text-sm font-medium text-center mb-2">Выберите город фракции:</p>
                          <select className="w-full bg-[#111315] border border-[#2a2d30] text-[#9ca3af] text-sm rounded-md px-3 py-2.5">
                            <option>Открыть список городов</option>
                          </select>
                        </div>
                      </>
                    )}

                    {fields.map((field, idx) => (
                      <div key={field.id}>
                        <p className="text-white text-sm font-medium text-center mb-2">
                          {idx + 1}. {field.label}:{field.required && <span className="text-red-400 ml-1">*</span>}
                        </p>
                        {field.type === "textarea" ? (
                          <textarea
                            placeholder={field.placeholder}
                            rows={6}
                            className="w-full bg-[#111315] border border-[#2a2d30] text-[#9ca3af] text-sm rounded-md px-4 py-3 focus:outline-none resize-none placeholder:text-[#4b5563]"
                          />
                        ) : field.type === "dropdown" ? (
                          <select className="w-full bg-[#111315] border border-[#2a2d30] text-[#9ca3af] text-sm rounded-md px-3 py-2.5">
                            <option>{field.placeholder || "Выберите вариант"}</option>
                            {(field.options || []).map((opt) => <option key={opt}>{opt}</option>)}
                          </select>
                        ) : field.type === "date" ? (
                          <input type="date" className="w-full bg-[#111315] border border-[#2a2d30] text-[#9ca3af] text-sm rounded-md px-3 py-2.5 focus:outline-none" />
                        ) : (
                          <input
                            type={field.type === "url" ? "url" : "text"}
                            placeholder={field.placeholder}
                            className="w-full bg-[#111315] border border-[#2a2d30] text-[#9ca3af] text-sm rounded-md px-3 py-2.5 focus:outline-none placeholder:text-[#4b5563]"
                          />
                        )}
                      </div>
                    ))}

                    <div className="text-center pt-2">
                      <button className="px-8 py-3 bg-[#4ade80] text-black font-semibold rounded-full hover:bg-[#22c55e] transition-colors text-sm">
                        Отправить жалобу
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-4 bg-[#1e2124] border border-[#2a2d30] rounded-xl px-6 py-4">
                  <h3 className="text-[#4ade80] font-semibold mb-2">Дополнительная информация:</h3>
                  <ul className="text-[#9ca3af] text-sm space-y-1 list-disc list-inside">
                    <li>Просмотреть список всех жалоб можно <span className="text-[#4ade80] underline cursor-pointer">в данном разделе</span>.</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}