import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useAuth } from '../../../../contexts/AuthContext';

import styles from './EditProfile.module.css';

export default function EditProfile() {
    const [loading] = useState(false);
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    return (
        <main>
            <Helmet>
                <title>Изменение персональных данных | Веломагазин RMBike.by</title>
            </Helmet>

                    <div className={styles.profileInfo}>
                    <p>
                        <strong>Email:</strong> {currentUser?.email}
                    </p>
                    <p>
                        <strong>Статус:</strong>{' '}
                        {currentUser?.emailVerified ? 'Подтвержден' : 'Не подтвержден'}
                    </p>
                    </div>


                    <div className={styles.profileActions}>
                        <button
                            className={styles.updateProfileBtn}
                            onClick={() => navigate('/update-profile')}
                            disabled={loading}
                        >
                        Обновить профиль
                    </button>
                    </div>
        </main>
    );
}