import { toPng } from 'html-to-image';
import { House } from '../data/housesData';

export async function downloadCredentialImage(
  element: HTMLElement | null,
  house: House,
  studentName: string
): Promise<void> {
  const sanitizedStudent = (studentName || 'Estudiante')
    .trim()
    .replace(/[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ ]/g, '')
    .replace(/\s+/g, '_');
  const filename = `Credencial_Equilibria360_${house.name.replace(/\s+/g, '_')}_${sanitizedStudent}.png`;

  // Try method 1: html-to-image
  if (element) {
    try {
      const dataUrl = await toPng(element, {
        quality: 0.98,
        pixelRatio: 2, // Retinal high resolution
        cacheBust: true,
        style: {
          transform: 'none',
          borderRadius: '16px',
        },
      });

      triggerDownload(dataUrl, filename);
      return;
    } catch (err) {
      console.warn('html-to-image failed, falling back to Canvas badge generator:', err);
    }
  }

  // Method 2: High-definition direct Canvas badge generator (100% reliable offline/cross-browser)
  await generateCanvasBadge(house, studentName, filename);
}

function triggerDownload(dataUrl: string, filename: string) {
  const link = document.createElement('a');
  link.download = filename;
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

async function generateCanvasBadge(
  house: House,
  studentName: string,
  filename: string
): Promise<void> {
  const canvas = document.createElement('canvas');
  const width = 1200;
  const height = 630;
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Background gradient (Deep Dark Slate)
  const bgGrad = ctx.createLinearGradient(0, 0, width, height);
  bgGrad.addColorStop(0, '#030712');
  bgGrad.addColorStop(0.5, '#0f172a');
  bgGrad.addColorStop(1, '#020617');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // Outer Decorative Border
  ctx.strokeStyle = house.theme.primaryColor || '#06b6d4';
  ctx.lineWidth = 4;
  roundRect(ctx, 24, 24, width - 48, height - 48, 28);
  ctx.stroke();

  // Subtle Inner Gold/Accent Border
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
  ctx.lineWidth = 1.5;
  roundRect(ctx, 36, 36, width - 72, height - 72, 20);
  ctx.stroke();

  // Ambient Glow in Top Right and Bottom Left
  const glow = ctx.createRadialGradient(250, 250, 10, 250, 250, 300);
  glow.addColorStop(0, house.theme.primaryColor + '33');
  glow.addColorStop(1, 'transparent');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, width, height);

  // Load and draw Crest image
  const img = new Image();
  img.crossOrigin = 'anonymous';

  await new Promise<void>((resolve) => {
    img.onload = () => {
      // Draw Crest with shadow and circular/rounded mask
      const imgX = 80;
      const imgY = 140;
      const imgSize = 250;

      ctx.save();
      // Glow behind image
      ctx.shadowColor = house.theme.primaryColor;
      ctx.shadowBlur = 30;
      ctx.strokeStyle = 'rgba(255,255,255,0.4)';
      ctx.lineWidth = 4;
      roundRect(ctx, imgX, imgY, imgSize, imgSize, 24);
      ctx.stroke();
      ctx.clip();
      ctx.drawImage(img, imgX, imgY, imgSize, imgSize);
      ctx.restore();
      resolve();
    };
    img.onerror = () => {
      // If image fails, draw placeholder badge
      const imgX = 80;
      const imgY = 140;
      const imgSize = 250;
      ctx.fillStyle = house.theme.primaryColor;
      roundRect(ctx, imgX, imgY, imgSize, imgSize, 24);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 36px serif';
      ctx.textAlign = 'center';
      ctx.fillText(house.figure, imgX + imgSize / 2, imgY + imgSize / 2 + 10);
      resolve();
    };
    img.src = house.crest;
  });

  // Top Badge Header Tag
  ctx.textAlign = 'left';
  ctx.fillStyle = '#10b981';
  ctx.font = 'bold 16px sans-serif';
  ctx.letterSpacing = '2px';
  ctx.fillText('CLUB EQUILIBRIA 360  •  CREDENCIAL OFICIAL', 380, 140);

  // Course Subtitle
  ctx.fillStyle = '#94a3b8';
  ctx.font = '500 16px sans-serif';
  ctx.letterSpacing = '0.5px';
  ctx.fillText('CURSO: INTELIGENCIA ARTIFICIAL APLICADA AL MEDIO AMBIENTE', 380, 170);

  // Horizontal divider
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(380, 190);
  ctx.lineTo(1120, 190);
  ctx.stroke();

  // Student Name
  ctx.fillStyle = '#ffffff';
  ctx.font = '900 40px serif';
  ctx.letterSpacing = '1px';
  const displayStudent = (studentName || 'Estudiante').toUpperCase();
  ctx.fillText(displayStudent, 380, 250);

  // House Name & Figure
  ctx.fillStyle = house.theme.accentColor || '#38bdf8';
  ctx.font = 'bold 24px sans-serif';
  ctx.fillText(`Miembro de la ${house.name} (${house.figure})`, 380, 295);

  // Motto
  ctx.fillStyle = '#cbd5e1';
  ctx.font = 'italic 20px serif';
  ctx.fillText(`“${house.motto}”`, 380, 340);

  // Role Card Box
  ctx.fillStyle = 'rgba(15, 23, 42, 0.8)';
  roundRect(ctx, 380, 380, 340, 110, 16);
  ctx.fill();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
  ctx.stroke();

  ctx.fillStyle = '#94a3b8';
  ctx.font = 'bold 12px sans-serif';
  ctx.fillText('ROL OFICIAL ASIGNADO', 405, 415);
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 20px sans-serif';
  ctx.fillText(house.frequentRole, 405, 450);

  // Talent & ID Box
  ctx.fillStyle = 'rgba(15, 23, 42, 0.8)';
  roundRect(ctx, 740, 380, 380, 110, 16);
  ctx.fill();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
  ctx.stroke();

  ctx.fillStyle = '#94a3b8';
  ctx.font = 'bold 12px sans-serif';
  ctx.fillText('TALENTO PRINCIPAL & CÓDIGO', 765, 415);
  ctx.fillStyle = house.theme.accentColor || '#38bdf8';
  ctx.font = 'bold 18px sans-serif';
  ctx.fillText(house.primaryTalent, 765, 445);
  ctx.fillStyle = '#64748b';
  ctx.font = '14px monospace';
  ctx.fillText(`ID: EQ360-${house.id.toUpperCase()}-2026`, 765, 472);

  // Footer Watermark & Security Seal
  ctx.fillStyle = '#64748b';
  ctx.font = '13px sans-serif';
  ctx.fillText('Validado por el Comité de Inteligencia Artificial & Sostenibilidad de Equilibria 360', 80, 560);

  ctx.textAlign = 'right';
  ctx.fillStyle = '#475569';
  ctx.font = '12px monospace';
  ctx.fillText('CERTIFICADO DIGITAL VERIFICABLE • 2026', 1120, 560);

  // Export to PNG and download
  const dataUrl = canvas.toDataURL('image/png');
  triggerDownload(dataUrl, filename);
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}
