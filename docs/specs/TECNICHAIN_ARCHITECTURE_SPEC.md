# Tecnichain — Cybersecurity Console Architecture Spec

**Date:** August 30, 2026
**App ID:** 6a94b21e0efe305d50ea31b3
**Purpose:** Centralized cybersecurity operations console for human-in-the-loop P1 escalations
**Integration:** Jasper Hypervisor (AI/auto-heal) → Tecnichain (human approval + push-button heal) → TechFlow Desk (general IT support)

## The Push-Button Heal Flow

```
Jasper Hypervisor detects P1 anomaly
    → Escalation gate holds it (human-in-the-loop required)
    → Ticket flows to Tecnichain as CyberTicket
    → Cyber tech sees: ticket title, error details, threat intel
    → System recommends fix (from AegisPlaybook match)
    → "Approve Fix" button lights up
    → Tech clicks Approve
    → System executes: heal → log → learn → update ticket
    → CyberHeal record created with full audit trail
    → Pattern + LearningMetric updated
    → Ticket status → resolved
    → Tech sees confirmation with full notes
```

## Entities (7)

### 1. CyberTicket
- ticket_id, title, description, status, priority, severity
- category, subcategory, anomaly_type
- vulnerable_algorithm, suggested_pqc_algorithm
- linked_anomaly_id, linked_playbook_id, linked_healing_event_id
- recommended_fix (the AI's recommended action text)
- fix_approved, approved_by, approved_at
- fix_executed, fix_executed_at, fix_result
- escalation_level, assigned_to, source_system
- customer_name, site_location
- sla_response_due_at, sla_due_at, sla_breached
- work_notes, resolution_notes
- first_response_at, resolved_at

### 2. CyberHeal
- ticket_id, tech_name, anomaly_type, playbook_id, playbook_name
- recommended_action, approved_by, approved_at
- steps_executed, action_taken, result, outcome
- duration_seconds, learning_extracted
- pqc_algorithm_used, crypto_migrated_from, crypto_migrated_to
- timestamp

### 3. CyberThreatIntel
- threat_name, threat_type, severity, source, description
- affected_systems, recommended_mitigation
- iocs (IPs, domains, hashes)
- first_seen, last_seen, status

### 4. CyberPlaybook
- name, anomaly_type, trigger_condition, severity
- recommended_action (what Approve button executes)
- healing_steps, verification_steps
- pqc_algorithm, rollback_steps
- confidence_threshold, success_count, failure_count
- estimated_time_minutes, risk_level

### 5. CyberTechProfile
- name, email, role, clearances, certifications
- skills, assigned_site, status
- tickets_assigned, tickets_resolved, avg_resolution_time
- pqc_certified, quantum_clearance_level

### 6. CyberDashboard
- source_app, health_score, threat_level, active_threats
- open_tickets, escalated_tickets, resolved_today
- pqc_readiness, vulnerable_crypto_count
- last_incident_time, mttr
- timestamp

### 7. CyberKnowledge
- title, category, threat_type, body
- pqc_algorithm, mitigation_steps
- difficulty, estimated_time, views
- linked_playbook_id, author

## Pages (7)
1. Cyber Dashboard — security posture, active threats, PQC readiness, escalation queue count
2. Escalation Queue — P1 tickets needing approval, "Approve Fix" buttons
3. Ticket Detail — error, recommended fix, approve button, execution log, learning
4. Threat Intel — threat feed with IOCs
5. Playbook Library — cyber playbooks with PQC focus
6. Knowledge Base — quantum/cyber HOW-TO articles
7. Cyber Team — tech profiles with PQC certification status

## PROTOTYPE DISCLAIMER
This software is a prototype and is provided for educational and research purposes only. It is not intended for production use, commercial deployment, or safety-critical environments. All systems are experimental and may contain defects on them.
