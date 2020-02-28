{ type ? "develop" }:
let
  nixpkgs =
    let cfg = builtins.fromJSON (builtins.readFile ./sources.json);
    in fetchTarball {
      url = "https://github.com/${cfg.owner}/${cfg.repo}/tarball/${cfg.rev}";
      sha256 = cfg.sha256;
    };
  pkgs = import nixpkgs {
    config = { allowUnfree = true; };
    overlays = [];
  };
  inherit (pkgs) lib;

  # TODO: Remove this when upgrading to nixos-20.03 when we can
  # use poetry from the stable channel
  unstable = import (fetchTarball {
    url = "https://github.com/nixos/nixpkgs/tarball/76e1d5cf3b8f817e4e43f5b0fcdb951426956c35";
    sha256 = "1iz5dr9xx8qa1m94pjlr0dmb0b1syp2sp1514gw10r877cjxqvd8";
  }) { config = {}; overlays = []; };

  dependencies = let mapping = {
    develop = developDeps ++ buildDeps ++ runDeps;
    build = buildDeps ++ runDeps;
    run = runDeps;
  }; in mapping.${type} or (throw
    "${type} is not a valid shell type. Valid ones are ${toString (lib.attrNames mapping)}");

  stdenv = if type == "develop" then pkgs.stdenv else pkgs.stdenvNoCC;

  developDeps = with pkgs; [
    gnumake
    nodejs
    b2sum
    libffi
    libxslt
    netcat
    openssl
    python38Full
    which
    zlib
    jq
  ]

  # The watchdog Python lib has a few extra requirements on Darwin (MacOS)
  # Taken from https://github.com/NixOS/nixpkgs/blob/d72887e0d28a98cc6435bde1962e2b414224e717/pkgs/development/python-modules/watchdog/default.nix#L20
  ++ lib.optionals pkgs.stdenv.isDarwin [
    pkgs.darwin.apple_sdk.frameworks.CoreServices
    pkgs.darwin.cf-private
  ];

  # These are needed to build the production artifacts
  buildDeps = with pkgs; [
    gitMinimal
  ];

  # Only these dependencies are needed to run in production
  runDeps = with pkgs; [
    ( unstable.poetry.override { python = unstable.python38; } )
    curl                      # For downloading other tools via Heroku shell
    unstable.postgresql_12    # For interacting with the database
  ];
in

stdenv.mkDerivation {
  name = "dev-shell";
  buildInputs = dependencies;

  # Needed to be able to install Python packages from GitHub
  GIT_SSL_CAINFO = "${pkgs.cacert}/etc/ssl/certs/ca-bundle.crt";

  # Such that nixpkgs doesn't need to be downloaded again when running we make
  # it a dependency of the derivation. Also allows using `nix-shell -p` with the
  # correct nixpkgs version
  NIX_PATH = "nixpkgs=${nixpkgs}";
}
