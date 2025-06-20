module.exports = {
  "extends": "lighthouse:default",
  "settings": {
    "onlyAudits": [
      "first-contentful-paint",
      "largest-contentful-paint", 
      "first-meaningful-paint",
      "speed-index",
      "interactive",
      "total-blocking-time",
      "cumulative-layout-shift",
      "server-response-time",
      "render-blocking-resources",
      "unused-css-rules",
      "unused-javascript",
      "modern-image-formats",
      "offscreen-images",
      "uses-responsive-images",
      "uses-optimized-images",
      "uses-webp-images",
      "efficient-animated-content",
      "uses-text-compression",
      "uses-rel-preconnect",
      "uses-rel-preload",
      "font-display",
      "critical-request-chains",
      "user-timings",
      "bootup-time",
      "mainthread-work-breakdown",
      "third-party-summary",
      "largest-contentful-paint-element",
      "layout-shift-elements",
      "uses-long-cache-ttl",
      "total-byte-weight",
      "dom-size",
      "meta-description",
      "document-title",
      "html-has-lang",
      "link-text",
      "is-crawlable",
      "robots-txt",
      "image-alt",
      "heading-order",
      "landmark-one-main",
      "list",
      "listitem",
      "meta-refresh",
      "meta-viewport",
      "color-contrast",
      "focus-traps",
      "focusable-controls",
      "interactive-element-affordance",
      "logical-tab-order",
      "managed-focus",
      "offscreen-content-hidden",
      "use-landmarks",
      "valid-lang",
      "video-caption",
      "custom-controls-labels",
      "custom-controls-roles",
      "focus-indicator",
      "href-no-hash",
      "internal-links-same-tab",
      "visual-order-follows-dom"
    ],
    "skipAudits": [
      "canonical",
      "plugins",
      "is-on-https",
      "redirects-http"
    ],
    "budgets": [
      {
        "path": "/*",
        "timings": [
          {
            "metric": "first-contentful-paint",
            "budget": 1500
          },
          {
            "metric": "largest-contentful-paint", 
            "budget": 2500
          },
          {
            "metric": "interactive",
            "budget": 3000
          },
          {
            "metric": "total-blocking-time",
            "budget": 300
          },
          {
            "metric": "cumulative-layout-shift",
            "budget": 0.1
          }
        ],
        "resourceSizes": [
          {
            "resourceType": "script",
            "budget": 150
          },
          {
            "resourceType": "stylesheet",
            "budget": 50
          },
          {
            "resourceType": "image",
            "budget": 300
          },
          {
            "resourceType": "font",
            "budget": 100
          },
          {
            "resourceType": "total",
            "budget": 1000
          }
        ],
        "resourceCounts": [
          {
            "resourceType": "script", 
            "budget": 10
          },
          {
            "resourceType": "stylesheet",
            "budget": 5
          },
          {
            "resourceType": "image",
            "budget": 15
          },
          {
            "resourceType": "font",
            "budget": 3
          }
        ]
      }
    ]
  },
  "categories": {
    "performance": {
      "title": "Performance",
      "auditRefs": [
        {"id": "first-contentful-paint", "weight": 10},
        {"id": "largest-contentful-paint", "weight": 25},
        {"id": "total-blocking-time", "weight": 30},
        {"id": "cumulative-layout-shift", "weight": 25},
        {"id": "speed-index", "weight": 10}
      ]
    },
    "accessibility": {
      "title": "Accessibility", 
      "description": "就活においてアクセシビリティは重要な評価ポイントです"
    },
    "best-practices": {
      "title": "Best Practices",
      "description": "セキュリティとベストプラクティスの遵守"
    },
    "seo": {
      "title": "SEO",
      "description": "採用担当者による検索・発見のしやすさ"
    }
  }
};
