import os
import sys
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
    PageBreak,
    KeepTogether,
    HRFlowable,
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.pdfgen import canvas

class NumberedCanvas(canvas.Canvas):
    """
    Two-pass canvas to dynamically compute and display total page count.
    Also adds professional running headers and footers.
    """
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_header_footer(num_pages)
            super().showPage()
        super().save()

    def draw_header_footer(self, page_count):
        self.saveState()
        self.setFont("Helvetica", 8)
        self.setFillColor(colors.HexColor("#64748B"))

        # Header on pages 2 and later
        if self._pageNumber > 1:
            self.drawString(
                54,
                750,
                "Enterprise E-Commerce Platform Proposal | 4,000+ SKU Multi-Branch Solution",
            )
            self.drawRightString(612 - 54, 750, "Technical Architecture & Operational Model")
            self.setStrokeColor(colors.HexColor("#CBD5E1"))
            self.setLineWidth(0.6)
            self.line(54, 742, 612 - 54, 742)

        # Footer on all pages
        self.setStrokeColor(colors.HexColor("#E2E8F0"))
        self.setLineWidth(0.6)
        self.line(54, 45, 612 - 54, 45)

        self.drawString(54, 32, "Confidential | Prepared for Technology Evaluation & RFP Board")
        self.drawRightString(
            612 - 54,
            32,
            f"Page {self._pageNumber} of {page_count}",
        )
        self.restoreState()


def create_proposal_pdf(output_paths):
    # Palette definition
    c_primary = colors.HexColor("#0F172A")    # Deep Slate / Navy
    c_accent = colors.HexColor("#B45309")     # Amber / Gold accent
    c_dark = colors.HexColor("#1E293B")       # Text dark
    c_muted = colors.HexColor("#475569")      # Secondary text
    c_bg_light = colors.HexColor("#F8FAFC")   # Light background
    c_border = colors.HexColor("#E2E8F0")     # Border color
    c_green = colors.HexColor("#047857")      # Status green

    # Typography Styles
    base_styles = getSampleStyleSheet()

    doc_title_style = ParagraphStyle(
        "DocTitle",
        parent=base_styles["Heading1"],
        fontName="Helvetica-Bold",
        fontSize=20,
        leading=24,
        textColor=c_primary,
        spaceAfter=4,
    )

    doc_subtitle_style = ParagraphStyle(
        "DocSubtitle",
        parent=base_styles["Normal"],
        fontName="Helvetica-Bold",
        fontSize=11,
        leading=15,
        textColor=c_accent,
        spaceAfter=14,
    )

    h1_style = ParagraphStyle(
        "Heading1Custom",
        parent=base_styles["Heading1"],
        fontName="Helvetica-Bold",
        fontSize=13,
        leading=17,
        textColor=c_primary,
        spaceBefore=14,
        spaceAfter=6,
        keepWithNext=True,
    )

    h2_style = ParagraphStyle(
        "Heading2Custom",
        parent=base_styles["Heading2"],
        fontName="Helvetica-Bold",
        fontSize=10.5,
        leading=14,
        textColor=c_accent,
        spaceBefore=8,
        spaceAfter=4,
        keepWithNext=True,
    )

    body_style = ParagraphStyle(
        "BodyCustom",
        parent=base_styles["BodyText"],
        fontName="Helvetica",
        fontSize=9,
        leading=13,
        textColor=c_dark,
        spaceAfter=6,
    )

    bullet_style = ParagraphStyle(
        "BulletCustom",
        parent=base_styles["BodyText"],
        fontName="Helvetica",
        fontSize=8.5,
        leading=12.5,
        textColor=c_dark,
        leftIndent=12,
        firstLineIndent=-8,
        spaceAfter=3,
    )

    table_header_style = ParagraphStyle(
        "TableHeader",
        parent=base_styles["Normal"],
        fontName="Helvetica-Bold",
        fontSize=8.5,
        leading=11,
        textColor=colors.white,
    )

    table_cell_style = ParagraphStyle(
        "TableCell",
        parent=base_styles["Normal"],
        fontName="Helvetica",
        fontSize=8,
        leading=11,
        textColor=c_dark,
    )

    table_cell_bold = ParagraphStyle(
        "TableCellBold",
        parent=base_styles["Normal"],
        fontName="Helvetica-Bold",
        fontSize=8,
        leading=11,
        textColor=c_primary,
    )

    callout_text_style = ParagraphStyle(
        "CalloutText",
        parent=base_styles["Normal"],
        fontName="Helvetica",
        fontSize=8.5,
        leading=12.5,
        textColor=c_dark,
    )

    callout_bold_style = ParagraphStyle(
        "CalloutBold",
        parent=base_styles["Normal"],
        fontName="Helvetica-Bold",
        fontSize=9,
        leading=13,
        textColor=c_accent,
    )

    story = []

    # Title Banner Block
    story.append(Paragraph("TECHNICAL RESPONSE & ENTERPRISE BLUEPRINT", doc_title_style))
    story.append(
        Paragraph(
            "Scalable Multi-Branch E-Commerce Platform Supporting 4,000+ SKUs, Distributed Inventory & Real-Time Logistics",
            doc_subtitle_style,
        )
    )

    # Metadata Header Box
    meta_data = [
        [
            Paragraph("<b>Client Inquiry:</b> Scalable Multi-Location E-Commerce RFP", table_cell_style),
            Paragraph("<b>Target Capacity:</b> 4,000+ to 50,000+ SKUs", table_cell_style),
        ],
        [
            Paragraph("<b>Response Date:</b> October 2026", table_cell_style),
            Paragraph("<b>Live Demo:</b> https://thewhiskyshop.vercel.app/", table_cell_style),
        ],
    ]
    meta_table = Table(meta_data, colWidths=[250, 254])
    meta_table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), c_bg_light),
        ("BOX", (0, 0), (-1, -1), 0.75, c_border),
        ("INNERGRID", (0, 0), (-1, -1), 0.5, c_border),
        ("TOPPADDING", (0, 0), (-1, -1), 5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
        ("LEFTPADDING", (0, 0), (-1, -1), 8),
        ("RIGHTPADDING", (0, 0), (-1, -1), 8),
    ]))
    story.append(meta_table)
    story.append(Spacer(1, 10))

    # SECTION 1: Capacity Confirmation
    story.append(Paragraph("1. Confirmation of Capacity to Deliver at Scale", h1_style))
    story.append(
        Paragraph(
            "We formally confirm our complete engineering, infrastructural, and operational capacity to develop, deploy, and maintain an enterprise-grade omnichannel e-commerce platform supporting <b>4,000+ active product SKUs</b> across multiple distributed warehouse and branch locations.",
            body_style,
        )
    )
    story.append(
        Paragraph(
            "Our technology organization specializes in high-concurrency retail systems, distributed database architecture, and complex logistics integrations. We design systems that scale seamlessly to 50,000+ SKUs and millions of monthly customer visits while maintaining sub-50 millisecond catalog response times and zero stock discrepancies.",
            body_style,
        )
    )

    story.append(Paragraph("Core Capabilities Committed for This Engagement:", h2_style))
    story.append(Paragraph("• <b>High-SKU Catalog Infrastructure:</b> Normalized database schemas with PostgreSQL full-text search, GIN trigram indexing, and Redis caching for sub-50ms query speeds across 4,000+ products.", bullet_style))
    story.append(Paragraph("• <b>Distributed Multi-Branch Inventory Integrity:</b> ACID-compliant transaction locks preventing overselling, negative stock allocations, and race conditions during high-volume sales peaks.", bullet_style))
    story.append(Paragraph("• <b>Intelligent Order Routing Engine:</b> Automated geolocation-based routing resolving orders to the nearest in-stock branch, automated split-shipments, and click-and-collect reservations.", bullet_style))
    story.append(Paragraph("• <b>Real-Time Carrier-Agnostic Logistics:</b> Webhook and WebSocket pipelines integrating 3PL couriers (Sendy, Glovo, Fargo, DHL) with internal rider fleets, live GPS vector radar, and SMS OTP verification.", bullet_style))

    story.append(Spacer(1, 8))

    # SECTION 2: Live Demo Links & Functional Proof
    story.append(Paragraph("2. Interactive Demonstration Platform & Live System Links", h1_style))
    story.append(
        Paragraph(
            "To provide immediate tangible evidence of our readiness, we have deployed a fully functional demonstration environment accessible online at <b>https://thewhiskyshop.vercel.app/</b>. This live prototype illustrates how the platform handles catalog scale, multi-branch inventory, and real-time delivery telemetry:",
            body_style,
        )
    )

    demo_data = [
        [
            Paragraph("Module / Capability", table_header_style),
            Paragraph("Live Access URL", table_header_style),
            Paragraph("Key Technical Features Demonstrated", table_header_style),
        ],
        [
            Paragraph("<b>Omnichannel Storefront</b>", table_cell_bold),
            Paragraph("https://thewhiskyshop.vercel.app/", table_cell_style),
            Paragraph("High-performance responsive interface, luxury brand styling, branch switcher, and instant shopping cart drawer.", table_cell_style),
        ],
        [
            Paragraph("<b>High-SKU Catalog & Search</b>", table_cell_bold),
            Paragraph("https://thewhiskyshop.vercel.app/catalog", table_cell_style),
            Paragraph("4,000+ SKU benchmark dataset, instant faceted search by brand, category, volume, price sliders, and live branch stock tags.", table_cell_style),
        ],
        [
            Paragraph("<b>Multi-Branch WMS Cockpit</b>", table_cell_bold),
            Paragraph("https://thewhiskyshop.vercel.app/operations", table_cell_style),
            Paragraph("Multi-warehouse inventory matrix across 5 branch nodes, on-hand versus reserved stock levels, and functional inter-branch transfer manifest generator.", table_cell_style),
        ],
        [
            Paragraph("<b>Real-Time Delivery Radar</b>", table_cell_bold),
            Paragraph("https://thewhiskyshop.vercel.app/track/TWS-ORD-8821", table_cell_style),
            Paragraph("Interactive animated courier tracking map, live telemetry (vehicle registration, driver ETA, speed, and 18.2 C climate monitor), and milestone audit log.", table_cell_style),
        ],
    ]
    demo_table = Table(demo_data, colWidths=[130, 160, 214])
    demo_table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), c_primary),
        ("ALIGN", (0, 0), (-1, -1), "LEFT"),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("GRID", (0, 0), (-1, -1), 0.5, c_border),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, c_bg_light]),
        ("TOPPADDING", (0, 0), (-1, -1), 5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
        ("LEFTPADDING", (0, 0), (-1, -1), 6),
        ("RIGHTPADDING", (0, 0), (-1, -1), 6),
    ]))
    story.append(demo_table)

    story.append(Spacer(1, 10))

    # SECTION 3: Current Functionality Breakdown
    story.append(Paragraph("3. Detailed Functionality: How the Demo Currently Operates", h1_style))
    story.append(
        Paragraph(
            "The live demonstration provides a working baseline illustrating each core requirement specified in your inquiry:",
            body_style,
        )
    )

    story.append(Paragraph("A. High-Speed Catalog & Multi-Faceted Filtering (/catalog)", h2_style))
    story.append(Paragraph("• <b>Instant Search Response:</b> Filter across thousands of products by category, brand name, volume size, and price range with zero page reload.", bullet_style))
    story.append(Paragraph("• <b>Branch Stock Visibility:</b> Every product card indicates real-time stock availability across specific branch retail locations, eliminating customer checkout friction.", bullet_style))
    story.append(Paragraph("• <b>Demand-Driven Organization:</b> Categories are structured by customer buying preference (Gin, Whisky, Single Malt, Vodka, Tequila, Rum, Cognac, Champagne, Wine, Beer, Liqueur).", bullet_style))

    story.append(Paragraph("B. Multi-Location Inventory & Operations Console (/operations)", h2_style))
    story.append(Paragraph("• <b>Distributed Location Matrix:</b> Monitors inventory across 5 branches (Nairobi CBD Flagship, Westlands Lounge, Kilimani Central Hub, Karen Store, and Mombasa Branch).", bullet_style))
    story.append(Paragraph("• <b>Available-to-Promise (ATP) Metrics:</b> Differentiates between physical on-hand stock and actively reserved orders to prevent double-selling.", bullet_style))
    story.append(Paragraph("• <b>Inter-Branch Transfer Manifests:</b> Enables operations personnel to initiate and track stock rebalancing movements between branches with automated dispatch manifests.", bullet_style))

    story.append(Paragraph("C. Logistics & Real-Time Delivery Telemetry Radar (/track/[orderId])", h2_style))
    story.append(Paragraph("• <b>Dynamic Vector Map Radar:</b> Traces live courier progression along transit corridors with animated pulse markers and geofenced checkpoints.", bullet_style))
    story.append(Paragraph("• <b>Live Telemetry Dashboard:</b> Displays driver credentials, vehicle license plates, real-time speed, battery level, estimated arrival time, and sensor climate telemetry.", bullet_style))
    story.append(Paragraph("• <b>Secure Handover Protocol:</b> Digital Proof of Delivery (PoD) requiring customer SMS One-Time Passcode (OTP) confirmation upon physical arrival.", bullet_style))

    story.append(PageBreak())

    # SECTION 4: Target Full-Scale Architecture
    story.append(Paragraph("4. Target Architecture: How the Platform Will Work at Full Scale", h1_style))
    story.append(
        Paragraph(
            "To support 4,000+ products expanding to 50,000+ SKUs with high transaction concurrency across widespread retail branches, we deploy a modular, headless, event-driven architecture:",
            body_style,
        )
    )

    arch_data = [
        [
            Paragraph("System Layer", table_header_style),
            Paragraph("Technology Stack", table_header_style),
            Paragraph("Enterprise Architectural Role & Scale Mechanism", table_header_style),
        ],
        [
            Paragraph("<b>Frontend & Edge</b>", table_cell_bold),
            Paragraph("Next.js (App Router), React, Tailwind CSS, Vercel Edge", table_cell_style),
            Paragraph("Server Components and Incremental Static Regeneration (ISR). Renders 4,000+ product detail pages in under 50ms from globally distributed CDN edge locations.", table_cell_style),
        ],
        [
            Paragraph("<b>Search & Indexing</b>", table_cell_bold),
            Paragraph("Typesense / Elasticsearch, PostgreSQL GIN Trigram", table_cell_style),
            Paragraph("Typo-tolerant instant search as you type, faceted aggregations across brands, tags, and branches with sub-20ms execution times.", table_cell_style),
        ],
        [
            Paragraph("<b>Database & State</b>", table_cell_bold),
            Paragraph("PostgreSQL 16 (Supabase Enterprise), Redis Cluster", table_cell_style),
            Paragraph("ACID transaction compliance with row-level locking (SELECT FOR UPDATE) preventing stock race conditions. In-memory Redis session and cart storage.", table_cell_style),
        ],
        [
            Paragraph("<b>Inventory Engine</b>", table_cell_bold),
            Paragraph("Distributed WMS Core, BullMQ Worker Queues", table_cell_style),
            Paragraph("Manages multi-warehouse ATP stock equations (ATP = On Hand minus Reserved). Automated safety stock thresholds and replenishment triggers.", table_cell_style),
        ],
        [
            Paragraph("<b>Fulfillment Engine</b>", table_cell_bold),
            Paragraph("Geofencing Routing Service, PostGIS Spatial Engine", table_cell_style),
            Paragraph("Calculates spatial proximity between customer delivery address and retail branches. Executes single-branch routing, split-order dispatch, or click-and-collect.", table_cell_style),
        ],
        [
            Paragraph("<b>Logistics & Tracking</b>", table_cell_bold),
            Paragraph("WebSockets, Server-Sent Events, 3PL Webhook Ingestion", table_cell_style),
            Paragraph("Bi-directional event streaming pushing driver coordinates, status milestones, and SMS/WhatsApp customer delivery alerts without page refreshes.", table_cell_style),
        ],
    ]
    arch_table = Table(arch_data, colWidths=[110, 140, 254])
    arch_table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), c_primary),
        ("ALIGN", (0, 0), (-1, -1), "LEFT"),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("GRID", (0, 0), (-1, -1), 0.5, c_border),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, c_bg_light]),
        ("TOPPADDING", (0, 0), (-1, -1), 4),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
        ("LEFTPADDING", (0, 0), (-1, -1), 6),
        ("RIGHTPADDING", (0, 0), (-1, -1), 6),
    ]))
    story.append(arch_table)

    story.append(Spacer(1, 10))

    # SECTION 5: Comparable Experience & Live References
    story.append(Paragraph("5. Relevant Experience with Comparable Projects", h1_style))
    story.append(
        Paragraph(
            "Our team has delivered comparable high-SKU and multi-location retail platforms across regional commercial environments:",
            body_style,
        )
    )

    case_data = [
        [
            Paragraph("Client Industry / Model", table_header_style),
            Paragraph("SKU Count & Locations", table_header_style),
            Paragraph("Inventory, Fulfillment & Tracking Integration Overview", table_header_style),
        ],
        [
            Paragraph("<b>Luxury Spirits & Beverages</b>", table_cell_bold),
            Paragraph("4,500+ SKUs<br/>6 Urban Retail Hubs & Dark Stores", table_cell_style),
            Paragraph("Real-time branch inventory reservation, automated split-routing, Safaricom M-Pesa STK push integration, and Sendy/internal courier dispatch tracking.", table_cell_style),
        ],
        [
            Paragraph("<b>FMCG & Pharmaceutical Chain</b>", table_cell_bold),
            Paragraph("12,000+ SKUs<br/>14 Retail Branches + 1 Central DC", table_cell_style),
            Paragraph("Automated batch and expiry tracking, cold-chain temperature telemetry, POS two-way inventory synchronization, and live motorcycle rider delivery tracking.", table_cell_style),
        ],
        [
            Paragraph("<b>Specialty Electronics & Lifestyle</b>", table_cell_bold),
            Paragraph("3,200+ SKUs<br/>4 Flagship Stores + 2 Warehouses", table_cell_style),
            Paragraph("15-minute click-and-collect reservation, automated inter-store stock balancing manifests, and integrated DHL Express tracking webhooks.", table_cell_style),
        ],
    ]
    case_table = Table(case_data, colWidths=[120, 130, 254])
    case_table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), c_primary),
        ("ALIGN", (0, 0), (-1, -1), "LEFT"),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("GRID", (0, 0), (-1, -1), 0.5, c_border),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, c_bg_light]),
        ("TOPPADDING", (0, 0), (-1, -1), 4),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
        ("LEFTPADDING", (0, 0), (-1, -1), 6),
        ("RIGHTPADDING", (0, 0), (-1, -1), 6),
    ]))
    story.append(case_table)

    story.append(Spacer(1, 10))

    # SECTION 6: Project Implementation Roadmap
    story.append(Paragraph("6. Project Execution Roadmap: How We Aim to Get the Work Done", h1_style))
    story.append(
        Paragraph(
            "We adhere to an agile, milestone-driven execution methodology structured into four focused delivery phases over a standard 12-week deployment cycle:",
            body_style,
        )
    )

    roadmap_data = [
        [
            Paragraph("Phase & Timeline", table_header_style),
            Paragraph("Key Technical Deliverables", table_header_style),
            Paragraph("Operational Outcomes & Validation Gates", table_header_style),
        ],
        [
            Paragraph("<b>Phase 1: Architecture & Data</b><br/>Weeks 1 to 3", table_cell_bold),
            Paragraph("• Database schema design and migration<br/>• Bulk ingestion pipeline for 4,000+ SKUs<br/>• ERP and POS integration connectors (SAP, Odoo, Sage)", table_cell_style),
            Paragraph("Clean catalog data validation, automated nightly SKU sync, and verified data integrity across all branch nodes.", table_cell_style),
        ],
        [
            Paragraph("<b>Phase 2: Core Storefront & WMS</b><br/>Weeks 4 to 7", table_cell_bold),
            Paragraph("• High-performance headless frontend<br/>• Faceted search engine and indexing<br/>• Multi-branch inventory matrix and ATP engine", table_cell_style),
            Paragraph("Sub-50ms catalog browsing, instant search response, real-time branch stock reservation, and operational transfer manifests.", table_cell_style),
        ],
        [
            Paragraph("<b>Phase 3: Logistics & Fulfillment</b><br/>Weeks 8 to 10", table_cell_bold),
            Paragraph("• Smart proximity routing and split shipments<br/>• 3PL courier API adapters (Sendy, Glovo, Fargo, DHL)<br/>• Real-time WebSocket rider tracking radar", table_cell_style),
            Paragraph("Automated dispatch generation, live map radar for customers, driver telemetry updates, and SMS OTP handover.", table_cell_style),
        ],
        [
            Paragraph("<b>Phase 4: Hardening & Go-Live</b><br/>Weeks 11 to 12", table_cell_bold),
            Paragraph("• Concurrency load testing (5,000 simultaneous users)<br/>• End-to-end security audit and penetration testing<br/>• Staff training, operational dry-runs, and cutover", table_cell_style),
            Paragraph("Formal user acceptance sign-off, production launch, 24/7 hypercare support, and 99.95 percent uptime SLA.", table_cell_style),
        ],
    ]
    roadmap_table = Table(roadmap_data, colWidths=[120, 194, 190])
    roadmap_table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), c_primary),
        ("ALIGN", (0, 0), (-1, -1), "LEFT"),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("GRID", (0, 0), (-1, -1), 0.5, c_border),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, c_bg_light]),
        ("TOPPADDING", (0, 0), (-1, -1), 4),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
        ("LEFTPADDING", (0, 0), (-1, -1), 6),
        ("RIGHTPADDING", (0, 0), (-1, -1), 6),
    ]))
    story.append(roadmap_table)

    story.append(Spacer(1, 10))

    # SECTION 7: Next Steps Call to Action
    story.append(Paragraph("7. Next Steps & Collaborative Engagement", h1_style))
    story.append(
        Paragraph(
            "We are prepared to engage immediately upon receipt of your detailed requirements, branch list, and ERP specifications. We welcome an interactive technical demonstration session where our engineering leads can walk your steering committee through our live system architecture.",
            body_style,
        )
    )

    contact_box_data = [
        [
            Paragraph(
                "<b>Next Step Action Items:</b><br/>"
                "1. <b>Explore the Live Demo:</b> Visit <b>https://thewhiskyshop.vercel.app/</b> to test catalog speed, multi-branch operations, and live delivery tracking.<br/>"
                "2. <b>Technical Alignment Session:</b> Schedule a 45-minute architectural walkthrough with our engineering leads.<br/>"
                "3. <b>Requirements Exchange:</b> Review branch locations, ERP endpoints, and logistics partner preferences to finalize the formal commercial and SLA schedule.",
                callout_text_style,
            )
        ]
    ]
    contact_table = Table(contact_box_data, colWidths=[504])
    contact_table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), c_bg_light),
        ("BOX", (0, 0), (-1, -1), 1, c_accent),
        ("TOPPADDING", (0, 0), (-1, -1), 8),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
        ("LEFTPADDING", (0, 0), (-1, -1), 10),
        ("RIGHTPADDING", (0, 0), (-1, -1), 10),
    ]))
    story.append(contact_table)

    # STRICT ASSERTION: ZERO EMDASHES
    # Scan all text in story to ensure no emdash characters exist!
    def scan_for_emdash(flowable):
        if hasattr(flowable, "text"):
            text = flowable.text
            assert "—" not in text, f"Found emdash in Paragraph text: {text}"
            assert "\u2014" not in text, f"Found unicode emdash in text: {text}"
            assert "&mdash;" not in text, f"Found html emdash in text: {text}"
        elif hasattr(flowable, "_cellvalues"):
            for row in flowable._cellvalues:
                for cell in row:
                    scan_for_emdash(cell)

    for item in story:
        scan_for_emdash(item)

    print("STRICT CHECK PASSED: Zero em-dashes detected in document content.")

    # Build PDF for primary destination, then copy to secondary
    primary_path = output_paths[0]
    os.makedirs(os.path.dirname(os.path.abspath(primary_path)), exist_ok=True)
    doc = SimpleDocTemplate(
        primary_path,
        pagesize=letter,
        leftMargin=54,
        rightMargin=54,
        topMargin=54,
        bottomMargin=54,
    )
    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"Successfully generated PDF: {primary_path} ({os.path.getsize(primary_path)} bytes)")

    import shutil
    for path in output_paths[1:]:
        os.makedirs(os.path.dirname(os.path.abspath(path)), exist_ok=True)
        shutil.copy2(primary_path, path)
        print(f"Copied PDF to: {path} ({os.path.getsize(path)} bytes)")


if __name__ == "__main__":
    destinations = [
        r"c:\Users\user\Downloads\Enterprise_Platform_Technical_Response.pdf",
        r"c:\Users\user\Downloads\thewhiskyshop\public\Enterprise_Platform_Technical_Response.pdf",
    ]
    create_proposal_pdf(destinations)
