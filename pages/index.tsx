import React, { useState } from 'react';
import { Calendar, Clock, Users, User, FileText, Download, Building, Building2, AlertCircle } from 'lucide-react';
import Head from 'next/head';

const MeetingScheduler = () => {
  const [clientName, setClientName] = useState('');
  const [accountantName, setAccountantName] = useState('');
  const [clientType, setClientType] = useState('single_owner_single_company');
  const [letterType, setLetterType] = useState('meeting'); // New: letter type selection
  const [meetings, setMeetings] = useState([
    { date: '', time: '' },
    { date: '', time: '' },
    { date: '', time: '' },
    { date: '', time: '' }
  ]);

  const updateMeeting = (index, field, value) => {
    const newMeetings = [...meetings];
    newMeetings[index][field] = value;
    setMeetings(newMeetings);
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const days = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'];
    const dayName = days[date.getDay()];
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);
    return `יום ${dayName}, ה-${day}/${month}/${year}`;
  };

  const getClientTypeConfig = () => {
    switch(clientType) {
      case 'single_owner_single_company':
        return {
          isPlural: false,
          reportsText: 'הדוחות הכספיים המבוקרים של החברה וגם הדוח האישי שלך',
          titleSuffix: 'ך',
          chooseVerb: 'בחר',
          updateVerb: 'ועדכן',
          waitingText: 'לך'
        };
      case 'single_owner_multiple_companies':
        return {
          isPlural: false,
          reportsText: 'הדוחות הכספיים המבוקרים של החברות וגם הדוח האישי שלך',
          titleSuffix: 'ך',
          chooseVerb: 'בחר',
          updateVerb: 'ועדכן',
          waitingText: 'לך'
        };
      case 'multiple_owners_single_company':
        return {
          isPlural: true,
          reportsText: 'הדוחות הכספיים המבוקרים של החברה וגם הדוחות האישיים שלכם',
          titleSuffix: 'כם',
          chooseVerb: 'בחרו',
          updateVerb: 'ועדכנו',
          waitingText: 'לכם'
        };
      case 'multiple_owners_multiple_companies':
        return {
          isPlural: true,
          reportsText: 'הדוחות הכספיים המבוקרים של החברות וגם הדוחות האישיים שלכם',
          titleSuffix: 'כם',
          chooseVerb: 'בחרו',
          updateVerb: 'ועדכנו',
          waitingText: 'לכם'
        };
      default:
        return getClientTypeConfig.call(this, 'single_owner_single_company');
    }
  };

  const getLetterTypeConfig = () => {
    const clientConfig = getClientTypeConfig();
    
    switch(letterType) {
      case 'meeting':
        return {
          title: '🏢 הזמנה לפגישה חשובה',
          filename: 'מועד פגישה',
          needsMeetings: true,
          content: {
            greeting: `הגיע הזמן לחדש!`,
            mainMessage: `${clientConfig.reportsText} לשנת המס 2024 מוכנים ומחכים לאישור${clientConfig.titleSuffix} הסופי! 📊`,
            sections: [
              {
                title: `לנוחיות${clientConfig.titleSuffix} 2 סוגי פגישות, כמפורט:`,
                options: [
                  {
                    title: '💻 פגישה דיגיטלית חדשנית',
                    details: `• <strong>טכנולוגיה פורצת דרך</strong> - ראשונים בתחום ברתימת הטכנולוגיה!<br>
                             • חוויית לקוח אינטראקטיבית מהמתקדמות<br>
                             • דף נחיתה מיוחד עם כל החומר והנתונים<br>
                             • גישה מתמשכת 24/7 לכל הנתונים<br>
                             • עדכונים בזמן אמת + ממשק ידידותי<br>
                             • חיסכון בזמן ובנסיעות מיותרות<br>
                             • אפשרות לפגישת זום במקביל`
                  },
                  {
                    title: '🏢 פגישה במשרד',
                    details: `• דיון אישי ומפורט פנים מול פנים במשרדנו<br>
                             • <strong>חניה בחינם</strong> על חשבוננו<br>
                             • רותי שלנו מחכה ${clientConfig.waitingText} עם Drinks ופיצוחים איכותיים<br>
                             • סביבה מקצועית ונוחה`
                  }
                ]
              }
            ]
          }
        };
      
      case 'cross_section':
        return {
          title: '📊 הזמנה לשיחת חתך עסקית',
          filename: 'שיחת חתך',
          needsMeetings: true,
          content: {
            greeting: `הזמנה לשיחת חתך חשובה!`,
            mainMessage: `הגיע הזמן לבחון יחד את המצב העסקי של${clientConfig.titleSuffix} ולתכנן את הצעדים הבאים לשנת 2024! 📈`,
            sections: [
              {
                title: `במהלך השיחה נסקור:`,
                options: [
                  {
                    title: '📈 ניתוח הביצועים העסקיים',
                    details: `• סקירת התוצאות הכספיות העדכניות<br>
                             • זיהוי נקודות חוזק והזדמנויות לשיפור<br>
                             • השוואה לתקופות קודמות ולתחום<br>
                             • ניתוח מגמות וחיזוי עתידי`
                  },
                  {
                    title: '🎯 תכנון אסטרטגי קדימה',
                    details: `• הגדרת יעדים עסקיים לשנה הקרובה<br>
                             • תכנון מיסוי חכם ואופטימיזציה<br>
                             • הצעות לייעול תהליכים<br>
                             • ייעוץ בתחום ההשקעות והחיסכון`
                  }
                ]
              }
            ]
          }
        };
      
      case 'general':
        return {
          title: '✉️ הודעה חשובה ממשרדנו',
          filename: 'מכתב כללי',
          needsMeetings: false,
          content: {
            greeting: `עדכון חשוב!`,
            mainMessage: `יש לנו מספר נושאים חשובים ${clientConfig.isPlural ? 'שברצוננו לעדכן אתכם עליהם' : 'שברצוננו לעדכן אותך עליהם'} 📝`,
            sections: [
              {
                title: `נושאים לעדכון${clientConfig.titleSuffix}:`,
                options: [
                  {
                    title: '📋 עדכונים רגולטוריים',
                    details: `• שינויים בחקיקה הרלוונטית לעסק${clientConfig.titleSuffix}<br>
                             • עדכונים במשרד האוצר ורשות המיסים<br>
                             • הזדמנויות חדשות לחיסכון מס<br>
                             • דרישות דיווח חדשות או מעודכנות`
                  },
                  {
                    title: '💡 הצעות לשיפור',
                    details: `• הצעות לייעול התהליכים העסקיים<br>
                             • כלים דיגיטליים חדשים לניהול הכספים<br>
                             • הזדמנויות להרחבה או פיתוח<br>
                             • עדכונים על שירותים נוספים במשרדנו`
                  }
                ]
              }
            ]
          }
        };
      
      case 'reminder':
        return {
          title: '⚠️ תזכורת נוספת - קבלת מסמכים לביקורת',
          filename: 'מכתב זירוז',
          needsMeetings: false,
          content: {
            greeting: `תזכורת נוספת – לקבלת מסמכי וגיבוי הנהלת חשבונות לשנת המס 2024 לצורך ביקורת ועריכת הדוחות הכספיים המבוקרים`,
            mainMessage: `בהמשך לפנייתנו הקודמות אליכם בקשר לעניין שבנדון, אנו מזכירים ${clientConfig.waitingText} בזאת כי עדיין לא התקבל במשרדנו החומר הדרוש לביקורת ועריכת ${clientConfig.reportsText} לשנת המס 2024.<br><br>
                         לנוכח העובדה שאנו נמצאים כבר בחודשים האחרונים של שנת המס 2025, עלול להיווצר עיכוב משמעותי שיגרום לקושי עבור${clientConfig.titleSuffix} ועבורנו להשלים במהירות את עבודת הביקורת ועריכת הדוחות הכספיים המבוקרים לשנת המס 2024.<br><br>
                         ככל שתמהרו להמציא לנו את מסמכי הנהלת החשבונות לשנת המס 2024 כך נוכל למהר ולסיים את עבודת הביקורת והעריכה.`,
            sections: [
              {
                title: `שימו לב:`,
                options: [
                  {
                    title: '🏦 חשיבות הדוחות לבנק',
                    details: `• הדוחות המבוקרים נדרשים בעיקר עבור הבנק שבו מתנהל חשבון הבנק של החברה<br>
                             • במיוחד לשמירה על מסגרות האשראי הקיימות<br>
                             • ובוודאי ובוודאי לטובת הגדלת מסגרות האשראי`
                  }
                ]
              },
              {
                title: `הנחיות לביצוע:`,
                options: [
                  {
                    title: '👥 בעלי המניות',
                    details: `• אנא וודאו שמנהל/ת החשבונות מעביר/ה אלינו את כל הנדרש`
                  },
                  {
                    title: `📋 למנהל/ת החשבונות`,
                    details: `• אנא העבירי במהירות האפשרית את קבצי הנהלת החשבונות הדיגיטליים<br>
                             • צרפי את כל מסמכי הראיות הנדרשים לביקורת<br>
                             • לאחר העברת החומר, אנא הודיעי לתיקו ושני על כך`
                  }
                ]
              },
              {
                title: `בקשה חשובה:`,
                options: [
                  {
                    title: '⚡ העברה מיידית',
                    details: `• אנו מבקשים להעביר את החומר כפי שהוא קיים אצל${clientConfig.titleSuffix}<br>
                             • ללא עיכובים בשל חוסרים באישורים או מסמכים לא מהותיים<br>
                             • ללא עיכוב בשל אי התאמה ביתרות לא מהותיות<br>
                             • נטפל בכל החסרים הנדרשים במהלך עבודת הביקורת בשיתוף פעולה אית${clientConfig.titleSuffix}`
                  },
                  {
                    title: '✅ לפני העברת החומר',
                    details: `• <strong>שוב אנא, עובר להעברת הנדרש</strong><br>
                             • אשרו לתיקו ושני בהודעת וואטסאפ<br>
                             • כדי להכניס את התיק מייד לעבודה`
                  }
                ]
              }
            ]
          }
        };

      default:
        return getLetterTypeConfig.call(this, 'meeting');
    }
  };

  const generateHTML = () => {
    const config = getClientTypeConfig();
    const letterConfig = getLetterTypeConfig();
    const displayName = clientName;
    
    const validMeetings = meetings.filter(m => m.date && m.time);
    
    const meetingsList = validMeetings.map((meeting, index) => {
      const formattedDate = formatDate(meeting.date);
      return `<div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); padding: 12px; border-radius: 10px; border-right: 3px solid #3b82f6; margin: 6px 0; box-shadow: 0 2px 3px rgba(0,0,0,0.1);">
        <div style="font-size: 15px; font-weight: 600; color: #1e40af; margin-bottom: 4px;">📅 אפשרות ${index + 1}</div>
        <div style="font-size: 14px; color: #374151;"><strong>${formattedDate}</strong></div>
        <div style="font-size: 13px; color: #6b7280; margin-top: 2px;">🕐 בשעה ${meeting.time}</div>
      </div>`;
    }).join('');

    const titleText = letterConfig.needsMeetings ? `מועדים זמינים לבחירת${config.titleSuffix}:` : '';
    const chooseText = letterConfig.needsMeetings ? `אנא ${config.chooseVerb} את המועד הכי נוח ${config.waitingText} ${config.updateVerb} אותי בהודעת וואטסאפ` : '';
    
    // Generate sections content
    const sectionsHtml = letterConfig.content.sections.map(section => {
      // Replace accountant name placeholders in the section title
      let sectionTitle = section.title;
      if (letterType === 'reminder' && accountantName) {
        sectionTitle = sectionTitle.replace('[שם מנהל/ת החשבונות]', accountantName);
      }

      return `
      <div class="section">
        <div class="section-title">
          <span class="emoji">🚀</span>
          ${sectionTitle}
        </div>
        ${section.options.map(option => {
          // Replace accountant name placeholders in option title and details
          let optionTitle = option.title;
          let optionDetails = option.details;

          if (letterType === 'reminder' && accountantName) {
            optionTitle = optionTitle.replace('[שם מנהל/ת החשבונות]', accountantName);
            optionDetails = optionDetails.replace(/\[שם מנהל\/ת החשבונות\]/g, accountantName);
            // Also replace in the specific format used in the reminder letter
            if (optionTitle.includes('למנהל/ת החשבונות')) {
              optionTitle = `📋 ל${accountantName}`;
            }
            if (optionDetails.includes('שמנהל/ת החשבונות')) {
              optionDetails = optionDetails.replace('שמנהל/ת החשבונות', `ש${accountantName}`);
            }
          }

          return `
          <div class="option">
            <div class="option-title">${optionTitle}</div>
            <div class="option-details">${optionDetails}</div>
          </div>
        `}).join('')}
      </div>
    `}).join('');

    const htmlContent = `<!DOCTYPE html>
<html dir="rtl" lang="he">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>הזמנה לפגישה - משרד רואי חשבון</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 15px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            direction: rtl;
            text-align: right;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background: white;
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            overflow: hidden;
            border: 1px solid #e5e7eb;
            direction: rtl;
            text-align: right;
        }
        .header {
            background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
            color: white;
            padding: 18px;
            text-align: center;
            position: relative;
            overflow: hidden;
        }
        .header::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
            animation: pulse 4s ease-in-out infinite;
        }
        @keyframes pulse {
            0%, 100% { transform: scale(1); opacity: 0.3; }
            50% { transform: scale(1.1); opacity: 0.1; }
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
            font-weight: 700;
            position: relative;
            z-index: 1;
        }
        .content {
            padding: 20px;
            direction: rtl;
            text-align: right;
        }
        .greeting {
            font-size: 18px;
            font-weight: 600;
            color: #1f2937;
            margin-bottom: 15px;
            text-align: center;
        }
        .main-message {
            background: linear-gradient(135deg, #fef3c7 0%, #fcd34d 20%, #f59e0b 100%);
            padding: 15px;
            border-radius: 12px;
            margin: 15px 0;
            border-right: 4px solid #d97706;
            box-shadow: 0 3px 5px rgba(0,0,0,0.05);
            text-align: right;
        }
        .section {
            margin: 20px 0;
            padding: 15px;
            background: #f9fafb;
            border-radius: 10px;
            border: 1px solid #e5e7eb;
            text-align: right;
        }
        .section-title {
            font-size: 16px;
            font-weight: 700;
            color: #1e40af;
            margin-bottom: 12px;
            display: flex;
            align-items: center;
            gap: 6px;
            text-align: right;
        }
        .option {
            background: white;
            padding: 12px;
            border-radius: 8px;
            margin: 8px 0;
            border-right: 3px solid #10b981;
            box-shadow: 0 2px 3px rgba(0,0,0,0.05);
            text-align: right;
        }
        .option-title {
            font-weight: 600;
            color: #065f46;
            font-size: 15px;
            margin-bottom: 6px;
            text-align: right;
        }
        .option-details {
            color: #374151;
            font-size: 13px;
            line-height: 1.4;
            text-align: right;
        }
        .meetings-section {
            background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
            padding: 18px;
            border-radius: 12px;
            margin: 18px 0;
            border: 2px solid #3b82f6;
            text-align: right;
        }
        .footer {
            background: linear-gradient(135deg, #374151 0%, #1f2937 100%);
            color: white;
            padding: 18px;
            text-align: center;
            font-weight: 600;
        }
        .highlight {
            background: linear-gradient(120deg, #fbbf24 0%, #f59e0b 100%);
            padding: 2px 8px;
            border-radius: 6px;
            font-weight: 600;
            color: #92400e;
        }
        .emoji {
            font-size: 1.2em;
            margin: 0 3px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>${letterConfig.title}</h1>
        </div>
        
        <div class="content">
            <div class="greeting">
                ${letterType === 'reminder'
                  ? `<div>לכבוד: ${displayName}</div>
                     ${accountantName ? `<div>ולכבוד: מנהל/ת החשבונות ${accountantName}</div>` : ''}
                     <div style="margin-top: 15px;">שלום רב,</div>`
                  : `שלום ${displayName} 👋`}
            </div>
            
            <div class="main-message">
                <div style="font-size: 18px; font-weight: 700; color: #92400e; margin-bottom: 10px;">
                    🚀 ${letterConfig.content.greeting}
                </div>
                <div style="font-size: 16px; color: #451a03;">
                    ${letterConfig.content.mainMessage}
                </div>
            </div>

            ${sectionsHtml}

            ${(letterConfig.needsMeetings && meetingsList) ? `
            <div class="meetings-section">
                <div class="section-title" style="color: #1e40af; font-size: 17px; margin-bottom: 15px;">
                    <span class="emoji">📅</span>
                    ${titleText}
                </div>
                ${meetingsList}
                <div style="margin-top: 15px; padding: 12px; background: linear-gradient(135deg, #fef3c7 0%, #fbbf24 100%); border-radius: 8px; text-align: center; border: 2px solid #f59e0b;">
                    <div style="font-weight: 600; color: #92400e;">
                        ${chooseText}
                    </div>
                </div>
            </div>
            ` : ''}
        </div>
        
        <div class="footer">
            <div style="font-size: 18px; margin-bottom: 10px;">
                🚀 בואו נחווה יחד את המהפכה הדיגיטלית
            </div>
            <div>
                <strong>סיגל וצוות המשרד החדשני</strong><br>
                מצפים לראות אתכם! 🌟
            </div>
        </div>
    </div>
</body>
</html>`;

    return htmlContent;
  };

  const downloadHTML = () => {
    const htmlContent = generateHTML();
    const letterConfig = getLetterTypeConfig();
    const blob = new Blob([htmlContent], { type: 'text/html; charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${clientName} - ${letterConfig.filename}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getValidMeetingsCount = () => meetings.filter(m => m.date && m.time).length;

  return (
    <>
      <Head>
        <title>כלי יצירת מכתבים - משרד פרנקו ושות&apos;</title>
        <meta name="description" content="כלי יצירת מכתבי הזמנה מקצועיים למשרד רואי חשבון" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className="max-w-4xl mx-auto p-4 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen" style={{direction: 'rtl'}}>
        <div className="bg-white rounded-2xl shadow-xl p-5 border border-gray-200" style={{direction: 'rtl', textAlign: 'right'}}>
          <div className="text-center mb-4">
            <h1 className="text-2xl font-bold text-gray-800 mb-1">🏢 כלי יצירת מכתבים</h1>
            <p className="text-sm text-gray-600">עבור משרד פרנקו ושות&apos; בע&quot;מ</p>
          </div>

        <div className="space-y-3">
          <h2 className="text-base font-semibold text-gray-700 mb-2" style={{textAlign: 'right'}}>הגדרות המכתב</h2>
          
          {/* Letter Type */}
          <div style={{textAlign: 'right'}}>
            <label className="block text-sm font-medium text-gray-700 mb-2" style={{textAlign: 'right'}}>
              סוג המכתב *
            </label>
            <div className="grid grid-cols-2 gap-2" style={{direction: 'rtl'}}>
              <label className="flex items-center gap-1 p-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer" style={{flexDirection: 'row'}}>
                <input
                  type="radio"
                  value="meeting"
                  checked={letterType === 'meeting'}
                  onChange={(e) => setLetterType(e.target.value)}
                  className="scale-90"
                />
                <Calendar className="w-3 h-3 text-blue-600" />
                <span className="text-xs">פגישה לדוחות מבוקרים</span>
              </label>

              <label className="flex items-center gap-1 p-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer" style={{flexDirection: 'row'}}>
                <input
                  type="radio"
                  value="cross_section"
                  checked={letterType === 'cross_section'}
                  onChange={(e) => setLetterType(e.target.value)}
                  className="scale-90"
                />
                <FileText className="w-3 h-3 text-green-600" />
                <span className="text-xs">שיחת חתך עסקית</span>
              </label>

              <label className="flex items-center gap-1 p-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer" style={{flexDirection: 'row'}}>
                <input
                  type="radio"
                  value="general"
                  checked={letterType === 'general'}
                  onChange={(e) => setLetterType(e.target.value)}
                  className="scale-90"
                />
                <FileText className="w-3 h-3 text-purple-600" />
                <span className="text-xs">מכתב כללי</span>
              </label>

              <label className="flex items-center gap-1 p-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer" style={{flexDirection: 'row'}}>
                <input
                  type="radio"
                  value="reminder"
                  checked={letterType === 'reminder'}
                  onChange={(e) => setLetterType(e.target.value)}
                  className="scale-90"
                />
                <AlertCircle className="w-3 h-3 text-orange-600" />
                <span className="text-xs">מכתב זירוז</span>
              </label>
            </div>
          </div>

          {/* Client Name */}
          <div style={{textAlign: 'right'}}>
            <label className="block text-sm font-medium text-gray-700 mb-2" style={{textAlign: 'right'}}>
              שם הלקוח *
            </label>
            <input
              type="text"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="הזן שם הלקוח"
              required
              style={{textAlign: 'right', direction: 'rtl'}}
            />
          </div>

          {/* Accountant Name - Only for reminder letter */}
          {letterType === 'reminder' && (
          <div style={{textAlign: 'right'}}>
            <label className="block text-sm font-medium text-gray-700 mb-2" style={{textAlign: 'right'}}>
              שם מנהל/ת חשבונות *
            </label>
            <input
              type="text"
              value={accountantName}
              onChange={(e) => setAccountantName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="הזן שם מנהל/ת החשבונות"
              required
              style={{textAlign: 'right', direction: 'rtl'}}
            />
          </div>
          )}

          {/* Client Type */}
          <div style={{textAlign: 'right'}}>
            <label className="block text-sm font-medium text-gray-700 mb-2" style={{textAlign: 'right'}}>
              סוג לקוח *
            </label>
            <div className="grid grid-cols-2 gap-2" style={{direction: 'rtl'}}>
              <label className="flex items-center gap-1 p-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer" style={{flexDirection: 'row'}}>
                <input
                  type="radio"
                  value="single_owner_single_company"
                  checked={clientType === 'single_owner_single_company'}
                  onChange={(e) => setClientType(e.target.value)}
                  className="scale-90"
                />
                <User className="w-3 h-3 text-green-600" />
                <Building className="w-3 h-3 text-blue-600" />
                <span className="text-xs">בעל שליטה + חברה</span>
              </label>

              <label className="flex items-center gap-1 p-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer" style={{flexDirection: 'row'}}>
                <input
                  type="radio"
                  value="single_owner_multiple_companies"
                  checked={clientType === 'single_owner_multiple_companies'}
                  onChange={(e) => setClientType(e.target.value)}
                  className="scale-90"
                />
                <User className="w-3 h-3 text-green-600" />
                <Building2 className="w-3 h-3 text-blue-600" />
                <span className="text-xs">בעל שליטה + חברות</span>
              </label>

              <label className="flex items-center gap-1 p-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer" style={{flexDirection: 'row'}}>
                <input
                  type="radio"
                  value="multiple_owners_single_company"
                  checked={clientType === 'multiple_owners_single_company'}
                  onChange={(e) => setClientType(e.target.value)}
                  className="scale-90"
                />
                <Users className="w-3 h-3 text-green-600" />
                <Building className="w-3 h-3 text-blue-600" />
                <span className="text-xs">בעלי שליטה + חברה</span>
              </label>

              <label className="flex items-center gap-1 p-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer" style={{flexDirection: 'row'}}>
                <input
                  type="radio"
                  value="multiple_owners_multiple_companies"
                  checked={clientType === 'multiple_owners_multiple_companies'}
                  onChange={(e) => setClientType(e.target.value)}
                  className="scale-90"
                />
                <Users className="w-3 h-3 text-green-600" />
                <Building2 className="w-3 h-3 text-blue-600" />
                <span className="text-xs">בעלי שליטה + חברות</span>
              </label>
            </div>
          </div>

          {/* Meeting Options */}
          {getLetterTypeConfig().needsMeetings && (
          <div style={{textAlign: 'right'}}>
            <label className="block text-sm font-medium text-gray-700 mb-2" style={{textAlign: 'right'}}>
              מועדי פגישה * (2-4 אפשרויות)
            </label>
            <div className="grid grid-cols-2 gap-2">
              {meetings.map((meeting, index) => (
                <div key={index} className="flex gap-2" style={{direction: 'rtl'}}>
                  <input
                    type="date"
                    value={meeting.date}
                    onChange={(e) => updateMeeting(index, 'date', e.target.value)}
                    className="flex-1 p-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    style={{textAlign: 'right', direction: 'rtl'}}
                  />
                  <input
                    type="time"
                    value={meeting.time}
                    onChange={(e) => updateMeeting(index, 'time', e.target.value)}
                    className="w-24 p-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    style={{textAlign: 'right', direction: 'rtl'}}
                    step="900"
                  />
                </div>
              ))}
            </div>
          </div>
          )}

          {/* Generate Button and Validation */}
          <div className="flex flex-col items-center gap-1">
            <div className="text-center">
              <p className="text-xs mb-1">
                {!clientName ? (
                  <span className="text-red-600">⚠ יש להזין שם לקוח</span>
                ) : (letterType === 'reminder' && !accountantName) ? (
                  <span className="text-red-600">⚠ יש להזין שם מנהל/ת חשבונות</span>
                ) : getLetterTypeConfig().needsMeetings ? (
                  getValidMeetingsCount() < 2 ? (
                    <span className="text-orange-600">⚠ יש להזין לפחות 2 מועדים</span>
                  ) : (
                    <span className="text-green-600">✓ {getValidMeetingsCount()} מועדים הוזנו</span>
                  )
                ) : (
                  <span className="text-green-600">✓ מוכן ליצירה</span>
                )}
              </p>
            </div>
            <button
              onClick={downloadHTML}
              className="px-5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center gap-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              disabled={!clientName || (letterType === 'reminder' && !accountantName) || (getLetterTypeConfig().needsMeetings && getValidMeetingsCount() < 2)}
            >
              <Download className="w-4 h-4" />
              יצור והורד קובץ HTML
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default MeetingScheduler;