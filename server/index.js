const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '..')));

let dashboards = [
  {
    id: "10025426",
    name: "Рециркуляционная вентиляция, Trox, xcube, Приточно-рециркуляционная установка 2С-ПР10.1",
    status: "Свободен",
    value: "101",
    icon: "./public/images/ventilation.svg",
    erpId: "68acdb6m-97a2-12e9-13d5-00165ff08700",
    serialNumber: "12345678",
    passportId: "86154",
    eo: "20035688",
    className: "-",
    manufacturer: "Trox GmbH"
  },
  {
    id: "10025427",
    name: "Осмометр Киви Осмометрия ОСКР-1М",
    status: "Занят",
    value: "2.5.03/2",
    icon: "./public/images/osmometer.svg",
    erpId: "88ee3b2d-67c4-90e8-11b7-11888bb87621",
    serialNumber: "00123455",
    passportId: "58975",
    eo: "87665433",
    className: "Класс Б",
    manufacturer: "Киви Осмометрия"
  },
  {
    id: "10025428",
    name: "Рециркуляционная вентиляция, Trox, xcube, Приточно-рециркуляционная установка 2С-ПР10.1",
    status: "Свободен",
    value: "101",
    icon: "./public/images/ventilation.svg",
    erpId: "68acdb6m-97a2-12e9-13d5-00165ff08700",
    serialNumber: "12345678",
    passportId: "86154",
    eo: "20035688",
    className: "-",
    manufacturer: "Trox GmbH"
  },
  {
    id: "10025429",
    name: "Система щелочи, Watertown, NaOH",
    status: "Свободен",
    value: "2.5.03/2",
    icon: "./public/images/alkali.svg",
    erpId: "28fedb4b-85a1-11e8-80e5-00155df02900",
    serialNumber: "37767108",
    passportId: "18941",
    eo: "10025426",
    className: "Система щелочи",
    manufacturer: "Watertown"
  },
  {
    id: "10025430",
    name: "Осмометр Киви Осмометрия ОСКР-1М",
    status: "Занят",
    value: "2.5.03/2",
    icon: "./public/images/osmometer.svg",
    erpId: "88ee3b2d-67c4-90e8-11b7-11888bb87621",
    serialNumber: "00123455",
    passportId: "58975",
    eo: "87665433",
    className: "Класс Б",
    manufacturer: "Киви Осмометрия"
  },
  {
    id: "10025431",
    name: "Осмометр Киви Осмометрия ОСКР-1М",
    status: "Занят",
    value: "101",
    icon: "./public/images/osmometer.svg",
    erpId: "88ee3b2d-67c4-90e8-11b7-11888bb87621",
    serialNumber: "00123455",
    passportId: "58975",
    eo: "87665433",
    className: "Класс Б",
    manufacturer: "Киви Осмометрия"
  },
  {
    id: "00-024004",
    name: "Бокс биологической безопасности",
    status: "Занят",
    value: "507",
    icon: "./public/images/chromatography.svg",
    erpId: "77ffsa7s-78g5-89p9-00a6-00999aa98710",
    serialNumber: "87654321",
    passportId: "00254",
    eo: "98712355",
    className: "-",
    manufacturer: "Биокад"
  },
  {
    id: "10025432",
    name: "Рециркуляционная вентиляция, Trox, xcube, Приточно-рециркуляционная установка 2С-ПР10.1",
    status: "Свободен",
    value: "010",
    icon: "./public/images/ventilation.svg",
    erpId: "68acdb6m-97a2-12e9-13d5-00165ff08700",
    serialNumber: "12345678",
    passportId: "86154",
    eo: "20035688",
    className: "-",
    manufacturer: "Trox GmbH"
  },
];

app.get('/api/dashboards', (req, res) => {
  res.json(dashboards);
});

app.put('/api/dashboards/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  
  const dashboard = dashboards.find(d => d.id === id);
  
  if (!dashboard) {
    return res.status(404).json({ error: 'Дашборд не найден' });
  }
  
  if (!['Свободен', 'Занят'].includes(status)) {
    return res.status(400).json({ error: 'Неверный статус' });
  }

  dashboard.status = status;
  
  res.json({ 
    success: true, 
    message: 'Статус обновлен',
    dashboard 
  });
});

app.get('/api/analytics/:id', (req, res) => {
  const { id } = req.params;
  
  const dashboard = dashboards.find(d => d.id === id);
  
  if (!dashboard) {
    return res.status(404).json({ error: 'Дашборд не найден' });
  }
  
  const records = generateRecords(id);
  
  res.json({
    ...dashboard,
    records: records
  });
});

function generateRecords(dashboardId) {
  const workTypes = ['Проверка', 'Калибровка', 'Обслуживание', 'Ремонт', 'Тестирование', 'Анализ'];
  const details = [
    'Образец/серия: 113-22',
    'Результат: успешно',
    'Результат: не удалось',
    'Плановое ТО',
    'Аварийное обслуживание',
    'Калибровка датчиков'
  ];
  const users = ['kharinskaiа', 'petrov', 'ivanov', 'sidorov', 'smirnov', 'vasiliev'];
  
  const records = [];
  const now = new Date();
  
  const count = Math.floor(Math.random() * 6) + 5;
  
  for (let i = 0; i < count; i++) {
    const date = new Date(now - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000));
    const formattedDate = date.toLocaleDateString('ru-RU', { 
      year: '2-digit', 
      month: '2-digit', 
      day: '2-digit' 
    }) + ' / ' + date.toLocaleTimeString('ru-RU', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
    
    records.push({
      date: formattedDate,
      workType: workTypes[Math.floor(Math.random() * workTypes.length)],
      details: details[Math.floor(Math.random() * details.length)],
      user: users[Math.floor(Math.random() * users.length)]
    });
  }
  
  return records;
}

app.get('/api/analytics', (req, res) => {
  const data = {
    system: "Система щелочи, Watertown, NaOH",
    id: "10025426",
    records: [
      {
        date: "09.10.25 / 13:29",
        workType: "Проверка",
        details: "Образец/серия: 113-22",
        user: "kharinskaiа"
      },
      {
        date: "09.10.25 / 13:29",
        workType: "Обработка",
        details: "Результат: не удалось",
        user: "kharinskaiа"
      }
    ]
  };
  res.json(data);
});

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, '../public/error.html'));
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});