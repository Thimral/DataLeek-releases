# Security

## Reporting a vulnerability

Please report security issues **privately**: on this repository, open **Security → Report a vulnerability**. Don't open a public issue. Include the DataLeek version (Settings → About), your operating system and the steps to reproduce. We aim to acknowledge reports within five working days and to keep you updated until a fix is released.

## Supported versions

Security fixes go into the latest release. Installed copies offer new versions automatically, so please keep DataLeek up to date.

## How DataLeek protects data

- **Local first:** datasets, analyses, notebooks, models and reports are stored on your computer. There is no DataLeek account, cloud service or telemetry.
- **Local-only server:** the interface talks to a server on `127.0.0.1` that requires a random per-launch token and rejects other hosts.
- **Secrets in the system keychain:** AI keys and database passwords go to Windows Credential Manager, macOS Keychain or the Linux Secret Service when available.
- **Read-only databases:** only single SELECT/WITH queries run, in read-only sessions where the database supports it.
- **Verified updates:** installers are checked against published SHA-256 checksums before they are opened.
- **Supply chain:** each release publishes a CycloneDX software bill of materials, and dependencies are scanned for known vulnerabilities before release.

Code cells and imported model or project files can run code with your permissions: only open files from people you trust. DataLeek does not encrypt data at rest; use full-disk encryption (BitLocker, FileVault, LUKS).
