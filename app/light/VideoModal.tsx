"use client";

interface Props {
  phrase: string;
  onClose: () => void;
}

// TODO: add actual bilibili BV ids for each phrase
const BVID_MAP: Record<string, string> = {
  "健康": 'BV1ZE411r7tq'
};

export function getBvId(phrase: string): string {
  return BVID_MAP[phrase] ?? "";
}

function getEmbedUrl(bvid: string) {
  return `//player.bilibili.com/player.html?isOutside=true&bvid=${bvid}&page=1&autoplay=0`;
}

export function VideoModal({ phrase, onClose }: Props) {
  const bvid = getBvId(phrase);

  return (
    <div className="video-overlay" onClick={onClose}>
      <div className="video-modal" onClick={(e) => e.stopPropagation()}>
        <div className="video-modal-header">
          <span className="video-modal-phrase">{phrase}</span>
          <button className="video-modal-close" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>
        <div className="video-modal-body">
          {bvid ? (
            <iframe
              className="video-modal-iframe"
              src={getEmbedUrl(bvid)}
              allow="autoplay; fullscreen; clipboard-write"
              allowFullScreen
            />
          ) : (
            <div className="video-modal-empty">
              <p>暂无视频</p>
              <span>视频链接待添加</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
