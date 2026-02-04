# robosats-nitro

`robosats-nitro` is a Nitro-based backend integration for RoboSats.

It is designed to be used either as a **stand-alone Nitro service** or as an **importable module** inside larger Nuxt/Nitro applications.

Its role is strictly backend-side:
- executing RoboSats API calls
- routing traffic through Tor / onion services
- acting as a controlled proxy for RoboSats operations

This package is intended to become one of the optional payment rails in **p2pay-core**.

---

## What already exists

### Backend execution layer

The following components are already implemented and working:

- Nitro server routes wrapping RoboSats robot endpoints
- Support for authenticated RoboSats requests (headers provided by the caller)
- Trade / offer creation helpers
- Contract polling helpers
- Server-only execution (no key material exposed to the browser)

`robosats-nitro` does **not** generate or own cryptographic identity.
It assumes a fully-initialized RoboSats identity is provided upstream.

---

## Existing Nitro endpoints

The module exposes Nitro server routes that act as a RoboSats proxy, including:

- Robot-authenticated API calls
- Offer creation
- Contract state polling
- Trade-related actions

Endpoints are intentionally:
- server-side only
- reusable
- deployable as part of a larger system

(The exact endpoint surface is expected to evolve and be documented once the API stabilizes.)

---

## Tor / onion routing

All RoboSats traffic is designed to run through:
- Tor
- RoboSats onion endpoints

This is handled at the Nitro / runtime level and is fully transparent to the Nuxt client.

---

## Usage modes

### 1. Stand-alone Nitro service
- Deployed independently
- Acts as a RoboSats execution proxy
- Useful for personal or shared infrastructure

### 2. Importable Nitro module
- Mounted inside a Nuxt / Nitro project
- Endpoints are auto-registered
- Intended usage inside p2pay-core

---

## Role inside p2pay-core

Within p2pay-core, RoboSats is treated as a **specialized payment rail**.

Because RoboSats requires posting a **bond**, this rail is:

- **disabled by default**
- **enabled manually by the merchant**
- selectable **per individual payment request**

The merchant explicitly adds RoboSats to the payment rails **at the moment a payment request is issued**.

This allows RoboSats to be used only when the merchant is willing to commit the bond.

---

## Bond handling and payment requests

In the p2pay flow:

- the merchant issues a payment request
- RoboSats is manually selected as the rail for that request
- the merchant effectively commits to posting the bond

For this reason, the RoboSats rail is intended only for:
- trusted customers
- recurring clients
- high-confidence payment scenarios

---

## Automatic bond funding (conditional)

Automatic bond funding is possible **only** when:

- the p2pay instance is connected to a user-owned BTCPay Server instance with integrated Lightning node
- the p2pay instance is connected to a BTCPay Server instance where the user is a guest but the server admin allows to share the Lightning node

Important flow detail:

- the merchant can generate the payment link **without** posting the bond
- the RoboSats offer is created **only when the payer opens the link and explicity proceeds with the Robosats rail**
- at that moment, the system can automatically fund the bond
- this enables payments even when the merchant is offline

This automation is not available without a BTCPay Server + LN node.

---

## Status

- Nitro execution layer: **implemented**
- Tor / onion routing: **implemented**
- p2pay-core integration: **in progress**
- API surface: **subject to refinement**

This module is intentionally low-level and infrastructure-oriented.
