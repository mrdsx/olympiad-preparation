import sys
import uvicorn
from pathlib import Path

from core import APP_HOST, APP_PORT, DEV_ENV, PROJECT_ENV

backend_dir = Path(__file__).parent.parent
if str(backend_dir) not in sys.path:
    sys.path.insert(0, str(backend_dir))


def main() -> None:
    uvicorn.run(
        app="main:app",
        host=APP_HOST,
        port=APP_PORT,
        reload=PROJECT_ENV == DEV_ENV,
    )


if __name__ == "__main__":
    main()
