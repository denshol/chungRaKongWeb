// components/settings/SettingsPage.jsx (계속)
import React, { useState, useEffect } from "react";
import styles from "../../styles/AdminDashboard.module.css";
import { db } from "../../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

const SettingsPage = () => {
  // 설정 상태
  const [settings, setSettings] = useState({
    siteSettings: {
      siteName: "청라콩 문화센터",
      siteDescription: "인천 청라동 문화센터",
      contactEmail: "admin@chungra.com",
      contactPhone: "032-123-4567",
    },
    userSettings: {
      defaultMemberStatus: "active",
      allowAutoRegistration: true,
      sendWelcomeEmail: true,
      inactivityPeriod: 90, // 일 단위
    },
    notificationSettings: {
      emailNotifications: true,
      smsNotifications: false,
      activityNotifications: true,
      marketingEmails: false,
    },
    securitySettings: {
      requireStrongPassword: true,
      sessionTimeout: 60, // 분 단위
      maxLoginAttempts: 5,
      autoLockPeriod: 30, // 분 단위
    },
  });

  const [isLoading, setIsLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState({});

  // Firestore에서 설정 불러오기
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const settingsDocRef = doc(db, "settings", "appSettings");
        const settingsDoc = await getDoc(settingsDocRef);

        if (settingsDoc.exists()) {
          setSettings(settingsDoc.data());
        } else {
          // 설정이 없으면 기본 설정 저장
          await setDoc(settingsDocRef, settings);
        }
      } catch (error) {
        console.error("설정 로드 중 오류 발생:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSettings();
  }, []);

  // 설정 변경 핸들러
  const handleSettingChange = (category, key, value) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      [category]: {
        ...prevSettings[category],
        [key]: value,
      },
    }));
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e, category) => {
    e.preventDefault();
    setSaveStatus({ ...saveStatus, [category]: "saving" });

    try {
      // Firestore에 설정 저장
      const settingsDocRef = doc(db, "settings", "appSettings");

      // 현재 설정 가져오기
      const currentSettingsDoc = await getDoc(settingsDocRef);
      const currentSettings = currentSettingsDoc.exists()
        ? currentSettingsDoc.data()
        : {};

      // 해당 카테고리만 업데이트
      await setDoc(
        settingsDocRef,
        {
          ...currentSettings,
          [category]: settings[category],
        },
        { merge: true }
      );

      setSaveStatus({ ...saveStatus, [category]: "success" });

      // 3초 후 성공 상태 초기화
      setTimeout(() => {
        setSaveStatus({ ...saveStatus, [category]: null });
      }, 3000);
    } catch (error) {
      console.error(`${category} 설정 저장 오류:`, error);
      setSaveStatus({ ...saveStatus, [category]: "error" });

      // 3초 후 오류 상태 초기화
      setTimeout(() => {
        setSaveStatus({ ...saveStatus, [category]: null });
      }, 3000);
    }
  };

  if (isLoading) {
    return <div className={styles.loadingContainer}>설정을 불러오는 중...</div>;
  }

  return (
    <div className={styles.settingsPage}>
      <h2 className={styles.settingsTitle}>관리자 설정</h2>

      {/* 사이트 설정 섹션 */}
      <div className={styles.settingSection}>
        <h3 className={styles.settingSectionTitle}>사이트 설정</h3>
        <form
          className={styles.settingsForm}
          onSubmit={(e) => handleSubmit(e, "siteSettings")}
        >
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>사이트 이름</label>
              <input
                type="text"
                className={styles.formControl}
                value={settings.siteSettings.siteName}
                onChange={(e) =>
                  handleSettingChange(
                    "siteSettings",
                    "siteName",
                    e.target.value
                  )
                }
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>사이트 설명</label>
              <input
                type="text"
                className={styles.formControl}
                value={settings.siteSettings.siteDescription}
                onChange={(e) =>
                  handleSettingChange(
                    "siteSettings",
                    "siteDescription",
                    e.target.value
                  )
                }
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>연락처 이메일</label>
              <input
                type="email"
                className={styles.formControl}
                value={settings.siteSettings.contactEmail}
                onChange={(e) =>
                  handleSettingChange(
                    "siteSettings",
                    "contactEmail",
                    e.target.value
                  )
                }
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>연락처 전화번호</label>
              <input
                type="tel"
                className={styles.formControl}
                value={settings.siteSettings.contactPhone}
                onChange={(e) =>
                  handleSettingChange(
                    "siteSettings",
                    "contactPhone",
                    e.target.value
                  )
                }
              />
            </div>
          </div>
          <div className={styles.formFooter}>
            <button
              type="submit"
              className={`${styles.btn} ${styles.btnPrimary}`}
              disabled={saveStatus.siteSettings === "saving"}
            >
              {saveStatus.siteSettings === "saving"
                ? "저장 중..."
                : saveStatus.siteSettings === "success"
                ? "저장 완료!"
                : saveStatus.siteSettings === "error"
                ? "저장 실패"
                : "저장"}
            </button>
          </div>
        </form>
      </div>

      {/* 회원 설정 섹션 */}
      <div className={styles.settingSection}>
        <h3 className={styles.settingSectionTitle}>회원 설정</h3>
        <form
          className={styles.settingsForm}
          onSubmit={(e) => handleSubmit(e, "userSettings")}
        >
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>기본 회원 상태</label>
              <select
                className={styles.formControl}
                value={settings.userSettings.defaultMemberStatus}
                onChange={(e) =>
                  handleSettingChange(
                    "userSettings",
                    "defaultMemberStatus",
                    e.target.value
                  )
                }
              >
                <option value="active">활성</option>
                <option value="inactive">정지</option>
                <option value="dormant">휴면</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>자동 가입 허용</label>
              <div className={styles.toggleSwitch}>
                <input
                  type="checkbox"
                  id="allowAutoRegistration"
                  checked={settings.userSettings.allowAutoRegistration}
                  onChange={(e) =>
                    handleSettingChange(
                      "userSettings",
                      "allowAutoRegistration",
                      e.target.checked
                    )
                  }
                />
                <label htmlFor="allowAutoRegistration"></label>
              </div>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>환영 이메일 발송</label>
              <div className={styles.toggleSwitch}>
                <input
                  type="checkbox"
                  id="sendWelcomeEmail"
                  checked={settings.userSettings.sendWelcomeEmail}
                  onChange={(e) =>
                    handleSettingChange(
                      "userSettings",
                      "sendWelcomeEmail",
                      e.target.checked
                    )
                  }
                />
                <label htmlFor="sendWelcomeEmail"></label>
              </div>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>비활성 기간 (일)</label>
              <input
                type="number"
                className={styles.formControl}
                value={settings.userSettings.inactivityPeriod}
                min="1"
                onChange={(e) =>
                  handleSettingChange(
                    "userSettings",
                    "inactivityPeriod",
                    parseInt(e.target.value)
                  )
                }
              />
            </div>
          </div>
          <div className={styles.formFooter}>
            <button
              type="submit"
              className={`${styles.btn} ${styles.btnPrimary}`}
              disabled={saveStatus.userSettings === "saving"}
            >
              {saveStatus.userSettings === "saving"
                ? "저장 중..."
                : saveStatus.userSettings === "success"
                ? "저장 완료!"
                : saveStatus.userSettings === "error"
                ? "저장 실패"
                : "저장"}
            </button>
          </div>
        </form>
      </div>

      {/* 알림 설정 섹션 */}
      <div className={styles.settingSection}>
        <h3 className={styles.settingSectionTitle}>알림 설정</h3>
        <form
          className={styles.settingsForm}
          onSubmit={(e) => handleSubmit(e, "notificationSettings")}
        >
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>이메일 알림</label>
              <div className={styles.toggleSwitch}>
                <input
                  type="checkbox"
                  id="emailNotifications"
                  checked={settings.notificationSettings.emailNotifications}
                  onChange={(e) =>
                    handleSettingChange(
                      "notificationSettings",
                      "emailNotifications",
                      e.target.checked
                    )
                  }
                />
                <label htmlFor="emailNotifications"></label>
              </div>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>SMS 알림</label>
              <div className={styles.toggleSwitch}>
                <input
                  type="checkbox"
                  id="smsNotifications"
                  checked={settings.notificationSettings.smsNotifications}
                  onChange={(e) =>
                    handleSettingChange(
                      "notificationSettings",
                      "smsNotifications",
                      e.target.checked
                    )
                  }
                />
                <label htmlFor="smsNotifications"></label>
              </div>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>활동 알림</label>
              <div className={styles.toggleSwitch}>
                <input
                  type="checkbox"
                  id="activityNotifications"
                  checked={settings.notificationSettings.activityNotifications}
                  onChange={(e) =>
                    handleSettingChange(
                      "notificationSettings",
                      "activityNotifications",
                      e.target.checked
                    )
                  }
                />
                <label htmlFor="activityNotifications"></label>
              </div>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>마케팅 이메일</label>
              <div className={styles.toggleSwitch}>
                <input
                  type="checkbox"
                  id="marketingEmails"
                  checked={settings.notificationSettings.marketingEmails}
                  onChange={(e) =>
                    handleSettingChange(
                      "notificationSettings",
                      "marketingEmails",
                      e.target.checked
                    )
                  }
                />
                <label htmlFor="marketingEmails"></label>
              </div>
            </div>
          </div>
          <div className={styles.formFooter}>
            <button
              type="submit"
              className={`${styles.btn} ${styles.btnPrimary}`}
              disabled={saveStatus.notificationSettings === "saving"}
            >
              {saveStatus.notificationSettings === "saving"
                ? "저장 중..."
                : saveStatus.notificationSettings === "success"
                ? "저장 완료!"
                : saveStatus.notificationSettings === "error"
                ? "저장 실패"
                : "저장"}
            </button>
          </div>
        </form>
      </div>

      {/* 보안 설정 섹션 */}
      <div className={styles.settingSection}>
        <h3 className={styles.settingSectionTitle}>보안 설정</h3>
        <form
          className={styles.settingsForm}
          onSubmit={(e) => handleSubmit(e, "securitySettings")}
        >
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>강력한 비밀번호 요구</label>
              <div className={styles.toggleSwitch}>
                <input
                  type="checkbox"
                  id="requireStrongPassword"
                  checked={settings.securitySettings.requireStrongPassword}
                  onChange={(e) =>
                    handleSettingChange(
                      "securitySettings",
                      "requireStrongPassword",
                      e.target.checked
                    )
                  }
                />
                <label htmlFor="requireStrongPassword"></label>
              </div>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>세션 타임아웃 (분)</label>
              <input
                type="number"
                className={styles.formControl}
                value={settings.securitySettings.sessionTimeout}
                min="1"
                onChange={(e) =>
                  handleSettingChange(
                    "securitySettings",
                    "sessionTimeout",
                    parseInt(e.target.value)
                  )
                }
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>최대 로그인 시도 횟수</label>
              <input
                type="number"
                className={styles.formControl}
                value={settings.securitySettings.maxLoginAttempts}
                min="1"
                onChange={(e) =>
                  handleSettingChange(
                    "securitySettings",
                    "maxLoginAttempts",
                    parseInt(e.target.value)
                  )
                }
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>자동 잠금 기간 (분)</label>
              <input
                type="number"
                className={styles.formControl}
                value={settings.securitySettings.autoLockPeriod}
                min="1"
                onChange={(e) =>
                  handleSettingChange(
                    "securitySettings",
                    "autoLockPeriod",
                    parseInt(e.target.value)
                  )
                }
              />
            </div>
          </div>
          <div className={styles.formFooter}>
            <button
              type="submit"
              className={`${styles.btn} ${styles.btnPrimary}`}
              disabled={saveStatus.securitySettings === "saving"}
            >
              {saveStatus.securitySettings === "saving"
                ? "저장 중..."
                : saveStatus.securitySettings === "success"
                ? "저장 완료!"
                : saveStatus.securitySettings === "error"
                ? "저장 실패"
                : "저장"}
            </button>
          </div>
        </form>
      </div>

      {/* 데이터 백업 섹션 */}
      <div className={styles.settingSection}>
        <h3 className={styles.settingSectionTitle}>데이터 백업</h3>
        <div className={styles.settingsForm}>
          <div className={styles.backupActions}>
            <button
              className={`${styles.btn} ${styles.btnOutlinePrimary}`}
              onClick={() => {
                alert("이 기능은 추후 구현될 예정입니다.");
              }}
            >
              데이터 백업 생성
            </button>
            <button
              className={`${styles.btn} ${styles.btnOutlinePrimary}`}
              onClick={() => {
                alert("이 기능은 추후 구현될 예정입니다.");
              }}
            >
              데이터 복원
            </button>
            <button
              className={`${styles.btn} ${styles.btnOutlineWarning}`}
              onClick={() => {
                if (
                  window.confirm(
                    "정말로 모든 데이터를 초기화하시겠습니까? 이 작업은 되돌릴 수 없습니다."
                  )
                ) {
                  alert("이 기능은 추후 구현될 예정입니다.");
                }
              }}
            >
              데이터 초기화
            </button>
          </div>
          <div className={styles.backupHistory}>
            <h4 className={styles.backupHistoryTitle}>백업 이력</h4>
            <p className={styles.noData}>백업 이력이 없습니다.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
