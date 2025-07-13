import React, { useEffect, useRef, useState, useContext } from "react";
import {
  BrowserMultiFormatReader
} from "@zxing/browser";
import {
  BarcodeFormat,
  DecodeHintType,
  NotFoundException
} from "@zxing/library";
import { walmartContext } from "../App";

export default function BarcodeScanner() {
  const { result, setResult } = useContext(walmartContext);
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState("");
  const videoRef = useRef(null);
  const codeReaderRef = useRef(null);
  const mountedRef = useRef(true);
  const resultRef = useRef(result);

  useEffect(() => {
    mountedRef.current = true;
    if (scanning) {
      setError("");
      const hints = new Map();
      hints.set(DecodeHintType.POSSIBLE_FORMATS, [
        BarcodeFormat.QR_CODE,
        BarcodeFormat.DATA_MATRIX,
        BarcodeFormat.AZTEC,
        BarcodeFormat.PDF_417,
        BarcodeFormat.EAN_13,
        BarcodeFormat.EAN_8,
        BarcodeFormat.UPC_A,
        BarcodeFormat.UPC_E,
        BarcodeFormat.CODE_39,
        BarcodeFormat.CODE_93,
        BarcodeFormat.CODE_128,
        BarcodeFormat.ITF,
        BarcodeFormat.MAXICODE,
        BarcodeFormat.RSS_14,
        BarcodeFormat.RSS_EXPANDED,
      ]);

      const codeReader = new BrowserMultiFormatReader(hints);
      codeReaderRef.current = codeReader;

      const constraints = {
        video: {
          facingMode: { ideal: "environment" },
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      };

      codeReader.decodeFromConstraints(
        constraints,
        videoRef.current,
        (result, err) => {
          if (!mountedRef.current) return;
          if (result && (resultRef.current === "Scanning...")) {
            setResult(result.getText());
            setScanning(false); // Stop scanning after a successful scan
          }
          if (err && !(err instanceof NotFoundException)) {
            setError("Scan error: " + err.message);
            console.error("Scan error:", err);
          }
        }
      ).catch(e => {
        setError("Camera error: " + e.message);
      });

      return () => {
        mountedRef.current = false;
        if (codeReader && typeof codeReader.reset === 'function') {
          codeReader.reset();
        } else if (codeReader && typeof codeReader.stopContinuousDecode === 'function') {
          codeReader.stopContinuousDecode();
        }
      };
    }
    return () => { mountedRef.current = false; };
  }, [scanning, setResult]);

  useEffect(() => { resultRef.current = result; }, [result]);

  const startScanning = () => {
    setScanning(true);
    setResult("Scanning...");
    setError("");
  };

  const stopScanning = () => {
    setScanning(false);
    setError("");
    // Stop the camera stream if active
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    // Clean up decoder
    const codeReader = codeReaderRef.current;
    if (codeReader && typeof codeReader.reset === 'function') {
      codeReader.reset();
    } else if (codeReader && typeof codeReader.stopContinuousDecode === 'function') {
      codeReader.stopContinuousDecode();
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
      {/* <h2 style={{ marginBottom: 16 }}>Barcode Scanner</h2> */}
      {!scanning && (
        <button
          onClick={startScanning}
          style={{ padding: "10px 24px", fontSize: "16px", borderRadius: 8, background: '#2563eb', color: '#fff', border: 'none', marginBottom: 24 }}
        >
          Start Scanning
        </button>
      )}
      {scanning && (
        <>
          <div style={{
            width: 350,
            height: 350,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '4px dashed #2563eb',
            borderRadius: 20,
            background: '#f0f6ff',
            marginBottom: 16
          }}>
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: 16,
                background: '#000',
              }}
            />
          </div>
          <button
            onClick={stopScanning}
            style={{ marginTop: "10px", padding: "10px 24px", fontSize: "15px", borderRadius: 8, background: '#ef4444', color: '#fff', border: 'none' }}
          >
            Stop Scanning
          </button>
        </>
      )}
      {error && <p style={{ color: "red", marginTop: 16 }}>{error}</p>}
      {/* <p style={{ marginTop: 8 }}>Result: {result}</p> */}
    </div>
  );
}
