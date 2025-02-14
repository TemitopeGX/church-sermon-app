export class BiometricService {
  static async isAvailable(): Promise<boolean> {
    if (!window.PublicKeyCredential) {
      return false;
    }

    return await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
  }

  static async authenticate(): Promise<boolean> {
    try {
      // Create WebAuthn credential options
      const options = {
        publicKey: {
          challenge: new Uint8Array(32),
          timeout: 60000,
          userVerification: "required" as UserVerificationRequirement,
          rpName: "Covenant Media",
        },
      };

      // Request user verification (biometric)
      await navigator.credentials.get(options);
      return true;
    } catch (error) {
      console.error("Biometric authentication failed:", error);
      return false;
    }
  }
}
