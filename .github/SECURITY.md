# 🔐 Security Policy

## Supported Versions

| Version | Supported          |
|---------|--------------------|
| 2.x     | ✅ Security updates |
| 1.x     | ❌ End of life     |

## Reporting a Vulnerability

We take security seriously. If you discover a vulnerability:

✅ **Do**:
- Email security@yourdomain.com (or use GitHub Private Vulnerability Reporting)
- Include steps to reproduce, affected versions, and potential impact
- Allow 72 hours for initial response

❌ **Don't**:
- Publicly disclose the issue before we've had time to respond
- Exploit the vulnerability beyond minimal testing
- Access user data or systems without authorization

## Security Features Implemented

- ✅ Minimal `@grant` permissions (principle of least privilege)
- ✅ Input sanitization: URLs only used in safe contexts (`fetch`, `a.href`)
- ✅ Integrity verification: SHA-256 hash checks (optional but enabled by default)
- ✅ Abort capability: Users can cancel downloads anytime
- ✅ Opt-in telemetry: No data leaves device without explicit consent
- ✅ Open source: Code is auditable by the community

## Threat Model

| Threat | Mitigation |
|--------|------------|
| Malicious fork injecting exfil code | Code signing + hash verification in future release |
| DOM clobbering via Telegram UI changes | Configurable selectors + feature detection |
| Memory exhaustion via large files | Streaming to disk via FileSystemAccessAPI |
| Network tampering (MITM) | HTTPS-only + optional SHA-256 integrity checks |
| Userscript manager compromise | Document safe installation practices in docs/INSTALL.md |

## Responsible Disclosure Timeline

1. Report received → Acknowledged within 72 hours
2. Triage & reproduction → 5 business days
3. Fix development → 14 business days (critical: 72 hours)
4. Patch release + public advisory → Coordinated with reporter

Thank you for helping keep this project secure! 🛡️