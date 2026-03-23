import subprocess
import os

CODE_FILE = "/workspace/user_code.py"

if not os.path.exists(CODE_FILE):
    print("user_code.py not found")
    raise SystemExit(1)

try:
    result = subprocess.run(
        ["python", CODE_FILE],
        capture_output=True,
        text=True,
        timeout=5
    )

    if result.stdout:
        print(result.stdout, end="")

    if result.stderr:
        print(result.stderr, end="")

except subprocess.TimeoutExpired:
    print("Execution timed out")
    raise SystemExit(124)