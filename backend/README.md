# Oracle Monitor Backend

This is a minimal Node.js backend that loads Oracle instance information from `instances.json` and exposes current metrics via `/metrics`.

The backend simulates metrics using random data. Integrate the `oracledb` library and replace `generateFakeMetrics` with real queries to monitor actual databases.
