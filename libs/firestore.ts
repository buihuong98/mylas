import { cert, getApps, initializeApp } from "firebase-admin/app"
import { getFirestore } from "firebase-admin/firestore"

// https://firebase.google.com/docs/web/setup#available-libraries

const alreadyCreatedApp = getApps()

let app =
  alreadyCreatedApp.length === 0
    ? initializeApp({
        credential: cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey:
            "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCJJ7+JOLCVilZ7\npZf1a6lFF+MDHr4bJDZH8+xDhjSV2hottd0woFNpSUgQXELhaNeN6hBHNIcKyQwR\nVbv0xCiqje//bXNEt4fV15eGIVr6EvN/adQ8Y6cbVM6/K9PFQtX93hVJwSFHelr+\njiUtndQKHJtAxdjsA37/GTJb8FHeGQKenXy41AFxPECFyJWMGBXjhGG6svfAUw2O\nk3i6J9If3BaH3cMSJ/UsvQz4Ox09sVCB5dCwTirGUzY4uo1G1ppOf/BH2kVFn9TA\nBruYaN248MXYkV/X9t93+KYUaQnGXLKAtHZ4rl2djhS6Uo+HX3G0qQ/mLxTozv4t\n/T4Ps1y3AgMBAAECggEACRJ/AeWlEI8w/0bJ0WsIrFBTLM6oxoTTrli9JQ5Ihi0C\nFEn2UpQYUFuPj716kwxrTbDQ2NTppdX8nVztbNhY1EdFO8ESodX9/zAejrnAGdCN\nGL14U3JICG/IqS6N+HteSkeZYuKKf/7g6/udC/Jnpy+TOWqc2ae1i8wv35L651Tp\nYcpDo4d+D+wPwvGsbSmpkwShoLEWciAcazVYw0oG6RgYQPanVVKRuwdXD2gz9a+R\nbO2bqheNX3xEIwYj99IgG9xPS3pMav9H6V9NPt7lcN7VjZIwE9P8LzjZwIKYAis7\nYsoGAVcpdfil5oTgNwSFgUOSZ6m5UDFkm7QTWqqAYQKBgQDAzRu0/4goq2VmS0pL\nyHY2+L9V+8GQfb2ju/JN82gEhWfuLDkNN2CTT/Pstsp/4Ni9iD5BKIKGQK2JgFu5\nhFlBWmHCxW+KuayeHfUxWuNw2LIyD9T0yDCHWttJVJNhRfHc2vOIm6JQWoqvInSk\nE+jZ4iT1bwx7/qJUWqJ4j7oDJwKBgQC2HR4DJQDfPonsarcEcbgIGMLDgOTREplH\nYBQHe8NGiglO256NG82jjfGw5PIKNMask0/FZ9WYaem6OfpgXr3WvWix6+ln+K/H\nZTrmiChHRa7utCQyfJulst/FMegrrM/X8wgK5Yp/pFQDb22OJtOSlESy3tOkq+O+\nQK6+QGGT8QKBgQCJEgltv/IMf/ZCKKr0f9tTr7tQJQFzeYHWo2tb8f30oOfH05bo\nB4PYl5Iiq74B9lgBP5iK+IL7cYYu6JvNpANUzC4OrBFl/iVz8HZ+lVB3zQe7Qbg0\nIxMlV/npA4EYOgL+8ocLiyJ1oDlS09s7P5BfP0DpYP7uNJUyBZHWxtAHJwKBgFFg\nf3m+Pj6DrpQDN5b3zdloXxeHcDfwjKe1Sh3x8teBdRlUz+uUIfbUxcxa8cEXxjN1\nfC7k8DA0G6oIoFYR39imOLNQjLLWEI4UMRa0fvMiM0IdIxOgVNjdLlrqqylhBlsk\nEVL1MUdKQfRrBVSBCwez02LuaTprSNBKDQucrz2xAoGBALJafFLgNmS5GU2j8HoI\nEP2245mn+B3UTuE0qMHBbTMIImYAFAJfLy7nwM3nF4pOtuyGePolzVaVXaf3u05V\nOyLiIZ+5RcTAKQ0PiJUubRA6wL7adUHbv525mMZyfT/Q6Hk+J2/CbfSU6I8ZtJCB\nFXw0nfAmI/qXAvjiKkjdhWqy\n-----END PRIVATE KEY-----\n",
        }),
      })
    : alreadyCreatedApp[0]

export const firestore = getFirestore(app)
