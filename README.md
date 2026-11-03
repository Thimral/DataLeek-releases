# DataLeek

**A desktop workspace for data analysts.** Bring data in, ask questions in plain English or pick from 57 tools, and turn the answers into a report. Everything runs on your computer.

This repository hosts DataLeek's **installers, release notes and download page**. The source code is private.

## Download

| System | File | First launch |
|---|---|---|
| Windows 10/11 (64-bit) | [DataLeek-Windows-Setup.exe](https://github.com/Thimral/DataLeek-releases/releases/latest/download/DataLeek-Windows-Setup.exe) | SmartScreen: **More info → Run anyway** |
| macOS 11+ (Apple silicon) | [DataLeek-macOS.zip](https://github.com/Thimral/DataLeek-releases/releases/latest/download/DataLeek-macOS.zip) | Drag to Applications. Open it once; when macOS blocks it, go to **System Settings → Privacy & Security** and click **Open Anyway** |
| macOS for IT (MDM) | [DataLeek-macOS.pkg](https://github.com/Thimral/DataLeek-releases/releases/latest/download/DataLeek-macOS.pkg) | Deploy with Jamf, Intune or Kandji |
| macOS 11+ (Intel) | [DataLeek-macOS-Intel.zip](https://github.com/Thimral/DataLeek-releases/releases/latest/download/DataLeek-macOS-Intel.zip) | Same as above |
| Ubuntu / Debian | [DataLeek-Linux.deb](https://github.com/Thimral/DataLeek-releases/releases/latest/download/DataLeek-Linux.deb) | `sudo apt install ./DataLeek-Linux.deb` |
| Linux (glibc 2.35+) | [DataLeek-Linux.tar.gz](https://github.com/Thimral/DataLeek-releases/releases/latest/download/DataLeek-Linux.tar.gz) | Extract, run `DataLeek/install.sh` |

Every release lists its changes and includes `SHA256SUMS.txt` to verify downloads, and a software bill of materials (`DataLeek-SBOM.cdx.json`). The download page is at **https://thimral.github.io/DataLeek-releases/**.

Installed copies check this repository once a day and offer new versions. Nothing installs without your OK.

## What it does

- **Gather:** files (CSV, Excel, JSON, Parquet, SQLite, PDF tables and more), pasted tables, web addresses, Kaggle, Hugging Face and OpenML, and read-only database connections (PostgreSQL, MySQL, SQL Server, ODBC).
- **Clean, analyse and chart:** 57 tools with plain-language interpretation, undoable versions for every change, 31 chart types, statistics and machine learning.
- **Code:** a Python notebook over your data when you want full control.
- **AI, optional:** a free local model (Ollama or LM Studio, no account) or your own key for Claude, ChatGPT, Grok, DeepSeek, Gemini and others.
- **Private:** no account, no telemetry. Your data stays on your computer.
- **Ready for work:** per-user or machine-wide install, keychain-stored passwords, daily backups, an audit log, and a policy file for IT.

## Help and feedback

- **Report a problem or ask for a feature:** [open an issue](https://github.com/Thimral/DataLeek-releases/issues/new/choose). Attach the diagnostics zip from Settings → About → **Save diagnostics** (it contains no data, keys or code).
- **Security issues:** please report privately, see [SECURITY.md](SECURITY.md).

## License

Copyright © 2026 THIMRAL (PTY) LTD. All rights reserved. DataLeek is proprietary software: you may install and use published copies; see [LICENSE](LICENSE). Open-source components included in the app keep their own licences, listed in `THIRD-PARTY-NOTICES.txt` inside each installation.
