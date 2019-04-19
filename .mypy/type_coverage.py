"""Verify that minimum type coverage is reached."""

from pathlib import Path

import argparse
import sys


def main(argv=sys.argv) -> None:  # pragma: no cover
    """Run type coverage check."""
    parser = argparse.ArgumentParser(
        usage=("python type_coverage.py coverage=80 file=typecov/linecount.txt \n")
    )
    parser.add_argument(
        "coverage",
        type=float,
        metavar="<coverage>",
        help="Minimum required type coverage.",
    )
    parser.add_argument(
        "file",
        type=str,
        metavar="<file>",
        help="File with line count type coverage report.",
    )
    args = parser.parse_args()
    report = Path(args.file)
    min_coverage = args.coverage
    if not report.is_file():
        sys.stdout.write(f"ERROR Line count report file not found on: {report}\n")
        sys.exit(1)
    with open(report) as f:
        coverage_summary = f.readline()
    if not coverage_summary:
        sys.stdout.write(f"ERROR Line count report file {report} is empty.\n")
        sys.exit(1)
    values = coverage_summary.split()
    coverage = int(values[0]) / int(values[1]) * 100

    if coverage >= min_coverage:
        sys.stdout.write(f"Total coverage: {coverage}%\n")
        sys.exit(0)
    else:
        sys.stdout.write(
            f"FAIL Required type coverage of {min_coverage}% not reached. Total coverage: {coverage}%\n"
        )
        sys.exit(1)


if __name__ == "__main__":
    main()
