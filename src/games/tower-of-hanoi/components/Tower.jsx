import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Tower.module.css';

const Tower = ({ pegName, disks, onClick, selected }) => {
    return (
        <div className={styles.tower} onClick={onClick}>
            <h3 className={styles.pegLabel}>Peg {pegName}</h3>
            <div className={`${styles.peg} ${selected ? styles.selected : ''}`}>
                <div className={styles.rod}></div> {/* Added rod element */}
                <AnimatePresence>
                    {disks.map((disk, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                            className={styles.disk}
                            style={{ width: `${disk * 20 + 40}px` }}
                        >
                            {disk}
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Tower;