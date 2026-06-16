const generateCertificateNumber = (userId, courseId) => {
  const timestamp = Date.now().toString(36).toUpperCase()
  const userPart = userId.toString().padStart(4, '0')
  const coursePart = courseId.toString().padStart(4, '0')
  return `BIMBLE-${userPart}-${coursePart}-${timestamp}`
}

const generateCertificateHTML = ({ userName, courseName, difficulty, issuedAt, certificateNumber }) => {
  const formattedDate = new Date(issuedAt).toLocaleDateString('id-ID', {
    day: 'numeric', month: 'long', year: 'numeric'
  })

  return `<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Sertifikat - ${courseName}</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800&family=Inter:wght@400;500&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Inter', sans-serif; background: #f8fafc; display: flex; justify-content: center; align-items: center; min-height: 100vh; padding: 20px; }
  .certificate { background: white; width: 794px; min-height: 562px; padding: 60px; border: 8px solid #4F46E5; position: relative; box-shadow: 0 20px 60px rgba(0,0,0,0.1); }
  .certificate::before { content: ''; position: absolute; inset: 12px; border: 2px solid #E0E7FF; pointer-events: none; }
  .header { text-align: center; margin-bottom: 40px; }
  .logo { font-family: 'Poppins', sans-serif; font-size: 28px; font-weight: 800; color: #4F46E5; letter-spacing: -1px; }
  .logo span { color: #F97316; }
  .subtitle { font-size: 12px; color: #6B7280; letter-spacing: 3px; text-transform: uppercase; margin-top: 4px; }
  .divider { width: 60px; height: 3px; background: linear-gradient(90deg, #4F46E5, #F97316); margin: 20px auto; border-radius: 2px; }
  .title { font-family: 'Poppins', sans-serif; font-size: 36px; font-weight: 700; color: #1F2937; text-align: center; margin-bottom: 8px; }
  .title-sub { font-size: 14px; color: #6B7280; text-align: center; letter-spacing: 2px; text-transform: uppercase; }
  .recipient-section { text-align: center; margin: 40px 0; }
  .presented-to { font-size: 14px; color: #6B7280; margin-bottom: 12px; }
  .recipient-name { font-family: 'Poppins', sans-serif; font-size: 42px; font-weight: 700; color: #4F46E5; border-bottom: 3px solid #E0E7FF; padding-bottom: 8px; display: inline-block; min-width: 300px; }
  .course-section { text-align: center; margin: 30px 0; }
  .completion-text { font-size: 14px; color: #6B7280; margin-bottom: 8px; }
  .course-name { font-family: 'Poppins', sans-serif; font-size: 22px; font-weight: 600; color: #1F2937; }
  .difficulty-badge { display: inline-block; padding: 4px 16px; border-radius: 20px; font-size: 12px; font-weight: 600; margin-top: 8px; background: ${difficulty === 'easy' ? '#D1FAE5' : difficulty === 'medium' ? '#FEF3C7' : '#FEE2E2'}; color: ${difficulty === 'easy' ? '#065F46' : difficulty === 'medium' ? '#92400E' : '#991B1B'}; }
  .footer { display: flex; justify-content: space-between; align-items: flex-end; margin-top: 50px; }
  .cert-info { text-align: left; }
  .cert-number { font-size: 11px; color: #9CA3AF; font-family: monospace; }
  .cert-date { font-size: 11px; color: #9CA3AF; margin-top: 4px; }
  .signature { text-align: center; }
  .signature-line { width: 150px; height: 2px; background: #D1D5DB; margin: 0 auto 8px; }
  .signature-name { font-family: 'Poppins', sans-serif; font-size: 14px; font-weight: 600; color: #1F2937; }
  .signature-title { font-size: 11px; color: #6B7280; }
  @media print {
    body { background: white; padding: 0; }
    .certificate { box-shadow: none; }
    .print-btn { display: none; }
  }
</style>
</head>
<body>
<div class="certificate">
  <div class="header">
    <div class="logo">Bimble<span>.id</span></div>
    <div class="subtitle">Platform E-Learning Indonesia</div>
    <div class="divider"></div>
  </div>
  <div class="title">Sertifikat Penyelesaian</div>
  <div class="title-sub">Certificate of Completion</div>
  <div class="recipient-section">
    <div class="presented-to">Dengan bangga diberikan kepada:</div>
    <div class="recipient-name">${userName}</div>
  </div>
  <div class="course-section">
    <div class="completion-text">telah berhasil menyelesaikan kursus:</div>
    <div class="course-name">${courseName}</div>
    <span class="difficulty-badge">${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}</span>
  </div>
  <div class="footer">
    <div class="cert-info">
      <div class="cert-number">No: ${certificateNumber}</div>
      <div class="cert-date">Diterbitkan: ${formattedDate}</div>
    </div>
    <div class="signature">
      <div class="signature-line"></div>
      <div class="signature-name">Tim Bimble.id</div>
      <div class="signature-title">Platform E-Learning Indonesia</div>
    </div>
  </div>
</div>
</body>
</html>`
}

module.exports = { generateCertificateNumber, generateCertificateHTML }
