const avatarShapes = {
  lion: `
    <circle cx="24" cy="24" r="20" fill="#C48830" />
    <circle cx="24" cy="26" r="14" fill="#E8C878" />
    <ellipse cx="24" cy="18" rx="16" ry="10" fill="#C48830" />
    <circle cx="19" cy="26" r="2.5" fill="#4A2C1D" />
    <circle cx="29" cy="26" r="2.5" fill="#4A2C1D" />
    <ellipse cx="24" cy="31" rx="3" ry="2" fill="#8B6320" />
  `,

  tiger: `
    <circle cx="24" cy="24" r="20" fill="#D4853A" />
    <circle cx="24" cy="28" r="14" fill="#F0D0A0" />
    <path d="M10 12 L14 18 L12 10Z" fill="#9A5E28" />
    <path d="M38 12 L34 18 L36 10Z" fill="#9A5E28" />
    <path d="M18 8 L20 14 L16 12Z" fill="#9A5E28" />
    <path d="M30 8 L28 14 L32 12Z" fill="#9A5E28" />
    <circle cx="19" cy="26" r="2.5" fill="#4A2C1D" />
    <circle cx="29" cy="26" r="2.5" fill="#4A2C1D" />
    <path d="M22 30 Q24 33 26 30" stroke="#4A2C1D" stroke-width="1.5" fill="none" />
  `,

  fox: `
    <path d="M8 10 L18 22 L16 6Z" fill="#C46030" />
    <path d="M40 10 L30 22 L32 6Z" fill="#C46030" />
    <circle cx="24" cy="26" r="16" fill="#C46030" />
    <path d="M16 24 Q24 16 32 24 Q24 30 16 24Z" fill="#F0D0A0" />
    <circle cx="19" cy="24" r="2" fill="#4A2C1D" />
    <circle cx="29" cy="24" r="2" fill="#4A2C1D" />
    <ellipse cx="24" cy="30" rx="2" ry="1.5" fill="#4A2C1D" />
  `,

  panda: `
    <circle cx="24" cy="24" r="20" fill="#F5F5F0" />
    <ellipse cx="16" cy="18" rx="6" ry="5" fill="#3A3A3A" />
    <ellipse cx="32" cy="18" rx="6" ry="5" fill="#3A3A3A" />
    <circle cx="19" cy="26" r="3" fill="#3A3A3A" />
    <circle cx="29" cy="26" r="3" fill="#3A3A3A" />
    <circle cx="19.5" cy="25.5" r="1" fill="#F5F5F0" />
    <circle cx="29.5" cy="25.5" r="1" fill="#F5F5F0" />
    <ellipse cx="24" cy="31" rx="3" ry="2" fill="#3A3A3A" />
  `,

  owl: `
    <circle cx="24" cy="24" r="20" fill="#7A6A4A" />
    <path d="M12 8 L16 16 L10 12Z" fill="#5A4A30" />
    <path d="M36 8 L32 16 L38 12Z" fill="#5A4A30" />
    <circle cx="18" cy="24" r="6" fill="#F0D0A0" />
    <circle cx="30" cy="24" r="6" fill="#F0D0A0" />
    <circle cx="18" cy="24" r="3" fill="#4A2C1D" />
    <circle cx="30" cy="24" r="3" fill="#4A2C1D" />
    <path d="M22 28 L24 31 L26 28" fill="#C4A050" />
  `,

  monkey: `
    <circle cx="24" cy="24" r="20" fill="#8B6A40" />
    <circle cx="24" cy="28" r="12" fill="#D4B080" />
    <circle cx="14" cy="30" r="5" fill="#D4B080" />
    <circle cx="34" cy="30" r="5" fill="#D4B080" />
    <circle cx="16" cy="30" r="3" fill="#F0D0A0" />
    <circle cx="32" cy="30" r="3" fill="#F0D0A0" />
    <circle cx="20" cy="24" r="2" fill="#4A2C1D" />
    <circle cx="28" cy="24" r="2" fill="#4A2C1D" />
    <path d="M22 29 Q24 31 26 29" stroke="#4A2C1D" stroke-width="1.5" fill="none" />
  `,

  frog: `
    <circle cx="24" cy="28" r="18" fill="#5A8A3A" />
    <ellipse cx="24" cy="22" rx="20" ry="14" fill="#5A8A3A" />
    <circle cx="16" cy="16" r="6" fill="#5A8A3A" />
    <circle cx="32" cy="16" r="6" fill="#5A8A3A" />
    <circle cx="16" cy="16" r="3" fill="#F5F5F0" />
    <circle cx="32" cy="16" r="3" fill="#F5F5F0" />
    <circle cx="16" cy="16" r="1.5" fill="#4A2C1D" />
    <circle cx="32" cy="16" r="1.5" fill="#4A2C1D" />
    <path d="M16 28 Q24 34 32 28" stroke="#3A6A20" stroke-width="2" fill="none" />
  `,

  dragon: `
    <path d="M8 14 L12 8 L16 14Z" fill="#8A3A3A" />
    <path d="M32 14 L36 8 L40 14Z" fill="#8A3A3A" />
    <path d="M12 6 L14 2 L16 6Z" fill="#6A2020" />
    <path d="M32 6 L34 2 L36 6Z" fill="#6A2020" />
    <circle cx="24" cy="26" r="18" fill="#8A3A3A" />
    <path d="M14 22 Q24 14 34 22 Q24 28 14 22Z" fill="#C4A040" />
    <circle cx="18" cy="24" r="2.5" fill="#F2C94C" />
    <circle cx="30" cy="24" r="2.5" fill="#F2C94C" />
    <circle cx="18" cy="24" r="1" fill="#4A2C1D" />
    <circle cx="30" cy="24" r="1" fill="#4A2C1D" />
    <path d="M20 32 Q24 35 28 32" stroke="#6A2020" stroke-width="2" fill="none" />
  `,
};

export function createAvatarIcon(id, size = 48) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', String(size));
  svg.setAttribute('height', String(size));
  svg.setAttribute('viewBox', '0 0 48 48');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  svg.innerHTML = avatarShapes[id] || '';
  return svg;
}
