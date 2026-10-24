import React, { useState } from 'react';
import { Organ, OrganId } from '../../types';
import { Check } from 'lucide-react';
import { sound } from '../../utils/audio';

interface BodyIllustrationProps {
  organs: Organ[];
  selectedOrganId: OrganId;
  onSelectOrgan: (organId: OrganId) => void;
  exploredOrganIds: string[];
  activeSystemFilter?: string;
}

export const BodyIllustration: React.FC<BodyIllustrationProps> = ({
  organs,
  selectedOrganId,
  onSelectOrgan,
  exploredOrganIds,
  activeSystemFilter
}) => {
  const [hoveredOrganId, setHoveredOrganId] = useState<OrganId | null>(null);

  const handleSelect = (id: OrganId) => {
    sound.playClick();
    onSelectOrgan(id);
  };

  const activeOrgan = organs.find((o) => o.id === selectedOrganId);

  // Friendly palette mapping for markers
  const getMarkerPalette = (id: OrganId) => {
    switch (id) {
      case 'heart': return { bg: '#FF9A4D', border: '#2B2A6E', text: '#FFFFFF' };
      case 'brain': return { bg: '#E8D6FF', border: '#2B2A6E', text: '#2B2A6E' };
      case 'lungs': return { bg: '#CDEBFA', border: '#2B2A6E', text: '#2B2A6E' };
      case 'liver': return { bg: '#FFD9B5', border: '#2B2A6E', text: '#2B2A6E' };
      case 'stomach': return { bg: '#DFF59B', border: '#2B2A6E', text: '#2B2A6E' };
      case 'kidneys': return { bg: '#CDEBFA', border: '#2B2A6E', text: '#2B2A6E' };
      case 'intestines': return { bg: '#F9A9CF', border: '#2B2A6E', text: '#2B2A6E' };
      default: return { bg: '#E8D6FF', border: '#2B2A6E', text: '#2B2A6E' };
    }
  };

  return (
    <div className="relative w-full max-w-[400px] mx-auto select-none">
      {/* SVG Canvas */}
      <svg
        viewBox="0 0 400 680"
        className="w-full h-auto"
        aria-label="Friendly Duotone Human Body Illustration"
      >
        <defs>
          <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#1D1A33" floodOpacity="0.08" />
          </filter>
        </defs>

        {/* ================= FRIENDLY SILHOUETTE ================= */}
        <g id="human-silhouette">
          {/* Main Body Path in soft warm Bone-Tint with deep ink contour */}
          <path
            d="
              M 200 45
              C 178 45, 162 62, 162 90
              C 162 114, 172 128, 182 134
              C 182 142, 180 148, 174 152
              C 142 162, 116 178, 102 215
              C 92 242, 80 300, 72 360
              C 68 390, 64 415, 68 425
              C 74 430, 84 410, 88 385
              L 100 300
              C 106 280, 115 270, 126 270
              C 126 295, 130 330, 134 370
              C 138 410, 146 440, 150 455
              C 150 460, 148 480, 144 530
              C 140 575, 136 615, 134 645
              C 134 655, 142 660, 154 660
              C 164 660, 168 650, 170 635
              C 174 600, 180 540, 184 485
              L 194 485
              L 200 480
              L 206 485
              L 216 485
              C 220 540, 226 600, 230 635
              C 232 650, 236 660, 246 660
              C 258 660, 266 655, 266 645
              C 264 615, 260 575, 256 530
              C 252 480, 250 460, 250 455
              C 254 440, 262 410, 266 370
              C 270 330, 274 295, 274 270
              C 285 270, 294 280, 300 300
              L 312 385
              C 316 410, 326 430, 332 425
              C 336 415, 332 390, 328 360
              C 320 300, 308 242, 298 215
              C 284 178, 258 162, 226 152
              C 220 148, 218 142, 218 134
              C 228 128, 238 114, 238 90
              C 238 62, 222 45, 200 45 Z
            "
            fill="#FFFFFF"
            stroke="#E8DEC4"
            strokeWidth="3"
            filter="url(#softShadow)"
          />

          {/* Gentle spine dashed guide */}
          <line x1="200" y1="135" x2="200" y2="445" stroke="#E5DAC0" strokeWidth="2" strokeDasharray="4 6" />
        </g>

        {/* ================= IN-SITU ORGAN SHAPES ================= */}
        {/* Brain */}
        <path
          d="M 182 72 C 172 72 168 80 170 90 C 172 98 178 104 186 104 C 192 104 196 98 200 98 C 204 98 208 104 214 104 C 222 104 228 98 230 90 C 232 80 228 72 218 72 Z"
          fill={selectedOrganId === 'brain' ? '#E8D6FF' : '#F5EEFF'}
          stroke="#2B2A6E"
          strokeWidth={selectedOrganId === 'brain' ? 2 : 1}
        />

        {/* Lungs */}
        <g fill={selectedOrganId === 'lungs' ? '#CDEBFA' : '#EDF7FD'} stroke="#2B2A6E" strokeWidth={selectedOrganId === 'lungs' ? 2 : 1}>
          <path d="M 162 170 C 150 170 144 182 144 208 C 144 228 152 238 166 238 C 176 238 180 228 180 210 C 180 185 174 170 162 170 Z" />
          <path d="M 238 170 C 250 170 256 182 256 208 C 256 228 248 238 234 238 C 224 238 220 224 220 208 C 220 185 226 170 238 170 Z" />
        </g>

        {/* Heart */}
        <path
          d="M 200 206 C 190 196 176 204 178 218 C 180 230 192 242 200 250 C 208 242 220 230 222 218 C 224 204 210 196 200 206 Z"
          fill={selectedOrganId === 'heart' ? '#FF9A4D' : '#FFE5D1'}
          stroke="#2B2A6E"
          strokeWidth={selectedOrganId === 'heart' ? 2.5 : 1}
          className={selectedOrganId === 'heart' ? 'animate-heart-pulse' : ''}
          style={{ transformOrigin: '200px 225px' }}
        />

        {/* Liver */}
        <path
          d="M 160 262 C 170 255 200 255 210 264 C 215 272 212 284 202 292 C 188 296 170 294 158 288 C 154 280 154 268 160 262 Z"
          fill={selectedOrganId === 'liver' ? '#FFD9B5' : '#FFF2E6'}
          stroke="#2B2A6E"
          strokeWidth={selectedOrganId === 'liver' ? 2 : 1}
        />

        {/* Stomach */}
        <path
          d="M 206 268 C 212 268 226 274 228 286 C 230 300 218 312 206 312 C 198 312 196 304 198 296 C 200 290 202 280 206 268 Z"
          fill={selectedOrganId === 'stomach' ? '#DFF59B' : '#F5FDDE'}
          stroke="#2B2A6E"
          strokeWidth={selectedOrganId === 'stomach' ? 2 : 1}
        />

        {/* Kidneys */}
        <g fill={selectedOrganId === 'kidneys' ? '#CDEBFA' : '#EDF7FD'} stroke="#2B2A6E" strokeWidth={selectedOrganId === 'kidneys' ? 2 : 1}>
          <path d="M 172 320 C 166 320 162 326 162 334 C 162 342 166 348 172 348 C 176 348 174 340 174 334 C 174 326 176 320 172 320 Z" />
          <path d="M 228 326 C 234 326 238 332 238 340 C 238 348 234 354 228 354 C 224 354 226 346 226 340 C 226 332 224 326 228 326 Z" />
        </g>

        {/* Intestines */}
        <path
          d="M 175 365 C 190 355 210 355 225 365 C 235 375 232 398 222 405 C 210 412 190 412 178 405 C 168 398 165 375 175 365 Z"
          fill={selectedOrganId === 'intestines' ? '#F9A9CF' : '#FDE8F2'}
          stroke="#2B2A6E"
          strokeWidth={selectedOrganId === 'intestines' ? 2 : 1}
        />

        {/* ================= CALLOUT LINE ================= */}
        {activeOrgan && activeOrgan.markerCoords.connectorX !== undefined && activeOrgan.markerCoords.connectorY !== undefined && (
          <g className="transition-all duration-300 pointer-events-none">
            <polyline
              points={`
                ${activeOrgan.markerCoords.x},${activeOrgan.markerCoords.y}
                ${activeOrgan.markerCoords.connectorX},${activeOrgan.markerCoords.connectorY}
                ${activeOrgan.markerCoords.connectorX < 200 ? activeOrgan.markerCoords.connectorX - 20 : activeOrgan.markerCoords.connectorX + 20},${activeOrgan.markerCoords.connectorY}
              `}
              fill="none"
              stroke="#1D1A33"
              strokeWidth="1.8"
              strokeDasharray="3 3"
            />
            <text
              x={activeOrgan.markerCoords.connectorX < 200 ? activeOrgan.markerCoords.connectorX - 25 : activeOrgan.markerCoords.connectorX + 25}
              y={activeOrgan.markerCoords.connectorY + 4}
              textAnchor={activeOrgan.markerCoords.connectorX < 200 ? 'end' : 'start'}
              fill="#1D1A33"
              fontSize="12"
              fontFamily="Fraunces, Georgia, serif"
              fontWeight="bold"
            >
              {activeOrgan.name}
            </text>
          </g>
        )}

        {/* ================= INTERACTIVE STICKER MARKERS ================= */}
        {organs.map((organ) => {
          const isSelected = organ.id === selectedOrganId;
          const isHovered = organ.id === hoveredOrganId;
          const isExplored = exploredOrganIds.includes(organ.id);
          const isSystemMatch = !activeSystemFilter || organ.systemId === activeSystemFilter;
          const palette = getMarkerPalette(organ.id);

          const cx = organ.markerCoords.x;
          const cy = organ.markerCoords.y;

          return (
            <g
              key={organ.id}
              role="button"
              tabIndex={0}
              aria-label={`Select ${organ.name}`}
              aria-pressed={isSelected}
              cursor="pointer"
              onClick={() => handleSelect(organ.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleSelect(organ.id);
                }
              }}
              onMouseEnter={() => setHoveredOrganId(organ.id)}
              onMouseLeave={() => setHoveredOrganId(null)}
              className="focus:outline-none transition-transform duration-200"
              style={{ opacity: isSystemMatch ? 1 : 0.3 }}
            >
              {/* Outer soft ring on hover/selected */}
              {(isSelected || isHovered) && (
                <circle
                  cx={cx}
                  cy={cy}
                  r="20"
                  fill={palette.bg}
                  opacity="0.35"
                  className="animate-ping"
                  style={{ animationDuration: '2s' }}
                />
              )}

              {/* Main sticker marker */}
              <circle
                cx={cx}
                cy={cy}
                r={isSelected ? 14 : 11}
                fill={palette.bg}
                stroke="#1D1A33"
                strokeWidth={isSelected ? 2.5 : 2}
                className="transition-all duration-200"
                filter="url(#softShadow)"
              />

              {/* Inner dot or check icon */}
              {isExplored ? (
                <circle cx={cx} cy={cy} r="3.5" fill="#1D1A33" />
              ) : (
                <circle cx={cx} cy={cy} r="2.5" fill="#1D1A33" />
              )}
            </g>
          );
        })}
      </svg>

      {/* Friendly Quick Selector Pills */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-1.5 px-2">
        {organs.map((organ) => {
          const isSelected = organ.id === selectedOrganId;
          const isExplored = exploredOrganIds.includes(organ.id);
          return (
            <button
              key={organ.id}
              onClick={() => handleSelect(organ.id)}
              className={`px-3 py-1.5 text-xs rounded-full font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                isSelected
                  ? 'bg-[#1D1A33] text-white font-bold shadow-sm'
                  : 'bg-white text-[#1D1A33] hover:bg-[#F3EAD3] border border-[#E8DEC4]'
              }`}
            >
              <span>{organ.name}</span>
              {isExplored && <Check className="w-3 h-3 text-[#2E5A14]" />}
            </button>
          );
        })}
      </div>
    </div>
  );
};
